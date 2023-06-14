const express = require('express')

const logout = (req, res) => {
    
    res.clearCookie("auth");
    console.log('logout')
    res.status(200).json({msg : 'logout'});
}

module.exports = {logout}