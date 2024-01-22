const obscureEmail = (email) => {
  const [name, domain] = email.split("@");
  const charsInBetween = name.substring(1, name.length - 1);
  const obscured = charsInBetween.replace(/./g, "*");
  return `${name[0]}${obscured}${name.slice(-1)}@${domain}`;
};

module.exports = obscureEmail;
