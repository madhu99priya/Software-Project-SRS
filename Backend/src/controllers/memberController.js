import Member from '../models/member.js';
import bcrypt from 'bcryptjs';


export const createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send(error);
  }
};


export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).send(members);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).send();
    }
    res.status(200).send(member);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const updateMember = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) {
      return res.status(404).send();
    }
    res.status(200).send(member);
  } catch (error) {
    res.status(400).send(error);
  }
};


export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).send();
    }
    res.status(200).send(member);
  } catch (error) {
    res.status(500).send(error);
  }
};
