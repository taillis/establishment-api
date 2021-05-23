module.exports = (oldEstablishment) => {
  const docEstablishment = oldEstablishment._doc;
  delete docEstablishment.password;
  return docEstablishment;
};
