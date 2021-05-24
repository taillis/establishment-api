// Method to remove sensitive data from establishment object

module.exports = (oldEstablishment) => {
  const docEstablishment = oldEstablishment._doc;
  delete docEstablishment.password;
  return docEstablishment;
};
