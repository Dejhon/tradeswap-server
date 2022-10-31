const express = require('express');
const Role = require('../models/roleModel');


exports.getRoles =  async  (req, res) =>{
  try{
    const roles = await Role.find();
    res.status(200).json(roles)
  }catch(err){
    res.status(500).json({
      status:"Fail",
      message: err
  });
  }
}

exports.addRole = async(req, res) =>{
  try{
    const newRole = await Role.create({
      roleType:req.body.roleType
    })
    res.status(200).json({
      status: 'success',
      data: {
        role: newRole
      }
    });
  }catch(err){
       res.status(400).json({
        status:"Fail",
        message: err
    });
  }
}

exports.getRoleById = async (req, res) =>{
  try{
  const role = await Role.find({_id: req.params.id})
    res.status(200).json(role);
  }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
  });
  }    
}

exports.updateRole = async (req, res) =>{
  try{
      const update = await Role.findByIdAndUpdate(req.params.id,
      {
        roleType: req.body.roleType
       },
       {new: true}
       )

      res.status(200).json({
      status: 'success',
      data:{
        Role: update
      }
    });
  }catch{
    res.status(404).json({
      status:"Fail",
      message: err
   });
  }  
}

exports.deletedRole = async (req, res) =>{
  try{
    if(req.params.id * 1 > Role.length){
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }else{
      const deleted = await Role.findByIdAndDelete({_id: req.params.id})
      res.status(200).json({
        status: 'success',
        data:{
          Role: deleted
        }
      });
    }    
    }catch(err){
    res.status(404).json({
      status:"Fail",
      message: err
   });
  } 
}