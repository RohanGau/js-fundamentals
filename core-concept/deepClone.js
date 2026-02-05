const obj = {
  name: {
    firstName: "Rohan",
    lastName: "Kumar",
  },
  address: {
    number: 8826841490,
    country: "india",
    pincode: 201005,
  },
  email: "rohan@gmail.com",
  hobbies: ["singing", "dancing", "music"],
};


function deepClone(obj) {
    if(
        typeof obj !== 'object' || obj === null || Array.isArray(obj) || typeof obj === 'function'
    ) return obj;
    let result = {};
    const keys = Object.keys(obj);
    console.log("keys :", keys);
    for(let key in obj) {
        console.log(keys[key]);
        result[key] = deepClone(obj[key]);
    }
    return result;
}

const newObj = deepClone(obj);
console.log("newObj :", newObj);

