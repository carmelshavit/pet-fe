function makeId() {
  return Math.random().toString(36).substring(2, 10);
}
async function signUp(user) {
  try {
    const response = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to save tweet. Status: ${response.status}`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
}
async function login(email, password) {
  try {
    const response = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to save user. Status: ${response.status}`);
    }

    const responseJson = await response.json();
    const user = responseJson.user;
    console.log("front line 43", user);
    const token = responseJson.token;
    saveTokenAndUserToStorage(token, user.id);
    return user;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}

async function getPets() {
  try {
    const response = await fetch("http://localhost:3001/pet", {
      method: "GET", // Assuming you are retrieving user data, so using GET method
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get pet. Status: ${response.status}`);
    }

    const petData = await response.json(); // Renamed variable to avoid conflict
    console.log("line 101: User data:", petData);
    return petData;
  } catch (error) {
    console.error("Error getting pet:", error);
    throw error;
  }
}
async function addPet(pet) {
  try {
    // console.log(pet);
    const token = loadTokenFromStorage();

    const response = await fetch("http://localhost:3001/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(pet),
    });

    console.log("line 91: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to save pet. Status: ${response.status}`);
    }
    const newPet = await response.json();
    console.log("line 77: New pet added:", newPet);
    return newPet;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
}
async function getUserById(userId) {
  try {
    console.log(userId);

    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "GET", // Assuming you are retrieving user data, so using GET method
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get user. Status: ${response.status}`);
    }

    const userData = await response.json(); // Renamed variable to avoid conflict
    console.log("line 101: User data:", userData);
    return userData;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
async function getCurrentLoggedInUser() {
  try {
    const token = loadTokenFromStorage();
    const response = await fetch("http://localhost:3001/user/me", {
      method: "GET", // Assuming you are retrieving user data, so using GET method
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get user. Status: ${response.status}`);
    }
    const userData = await response.json(); // Renamed variable to avoid conflict
    return userData;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
async function editUser(userId, editedUser) {
  try {
    console.log(userId);

    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editedUser }),
    });

    console.log("line 94: Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get user. Status: ${response.status}`);
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}
function saveTokenAndUserToStorage(token, userId) {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userId", userId);
      //add user instead userId and make sure dont have the password from backend. 

}
function loadTokenFromStorage() {
  return localStorage.getItem("userToken");
}
function loadUserFromStorage() {
  const data = localStorage.getItem("userId");
  return data;
}

export const petService = {
  login,
  makeId,
  signUp,
  saveToStorage,
  loadFromStorage,
  addPet,
  saveTokenAndUserToStorage,
  loadUserFromStorage,
  getUserById,
  editUser,
  getCurrentLoggedInUser,
  getPets,
};