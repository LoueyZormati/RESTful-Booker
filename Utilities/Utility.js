class Utility {
    
    static NameGenerator = class {
      static firstNamesMale = [
        "James", "John", "Robert", "Michael", "William",
        "David", "Richard", "Charles", "Joseph", "Thomas",
        "Christopher", "Daniel", "Paul", "Mark", "Donald",
        "George", "Kenneth", "Steven", "Edward", "Brian",
        "Ronald", "Anthony", "Kevin", "Jason", "Jeffrey"
      ];
  
      static firstNamesFemale = [
        "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth",
        "Barbara", "Susan", "Jessica", "Sarah", "Karen",
        "Nancy", "Lisa", "Betty", "Margaret", "Dorothy",
        "Helen", "Sandra", "Donna", "Carol", "Ruth",
        "Sharon", "Michelle", "Laura", "Cynthia", "Deborah"
      ];
  
      static generateRandomFirstName() {
        return Math.random() < 0.5
          ? this.getRandomName(this.firstNamesMale)
          : this.getRandomName(this.firstNamesFemale);
      }
  
      static getRandomName(names) {
        const index = Math.floor(Math.random() * names.length);
        return names[index];
      }
    };
  
  
    static RandomNumberGenerator = class {
      static generateRandomInteger() {
        return Math.floor(Math.random() * 1000) + 1;
      }
    };
  }
  module.exports ={Utility};