function analyzeEmail(text) {
  const words = ["urgent", "bank", "otp", "password", "click", "verify"];

  let score = 0;

  words.forEach(w => {
    if (text.toLowerCase().includes(w)) score += 10;
  });

  let risk = "LOW";
  if (score > 30) risk = "HIGH";
  else if (score > 10) risk = "MEDIUM";

  return { score, risk };
}

module.exports = analyzeEmail;