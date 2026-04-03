import { generateJoiningToken, getJoiningTokenHTML } from "../Libs/libs.js";
import Manager from "../models/manager.model.js";
import sendEmail from "../services/emailService.js";
import bcrypt from "bcrypt";

export async function addManager(req, res) {
  try {
    const { name, email, type } = req.body;

    const isUser = await Manager.findOne({ email });

    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const joiningToken = generateJoiningToken();

    const joiningTokenHash = await bcrypt.hash(joiningToken, 10);

    const manager = await Manager.create({
      ceo_id: req.user.id,
      name: name,
      email: email,
      type: type,
      joiningTokenHash: joiningTokenHash,
    });

    

    if (manager) {
      sendEmail(
        email,
        "Dont Share to anyone",
        "Joining Token for REN",
        getJoiningTokenHTML(joiningToken),
      );
    }

    return res
      .status(201)
      .json({ message: "Manager created successfully", manager });
  } catch (error) {
    console.log(error.message);
  }
}
