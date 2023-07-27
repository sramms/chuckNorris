const compareEmails =(email1, email2) => {
    // Extract domain names from emails (text after @ sign)
    const domain1 = email1.split('@')[1];
    const domain2 = email2.split('@')[1];
  
    // Compare domain names first
    if (domain1 < domain2) {
      return -1;
    } else if (domain1 > domain2) {
      return 1;
    } else {
      // If domain names are the same, compare the parts before @ sign
      const localPart1 = email1.split('@')[0];
      const localPart2 = email2.split('@')[0];
  
      if (localPart1 < localPart2) {
        return -1;
      } else if (localPart1 > localPart2) {
        return 1;
      } else {
        return 0; // Emails are equal
      }
    }
  }

module.exports = {compareEmails}