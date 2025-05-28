// firebase/database.js
import { ref, push, set, get, remove, onValue, off } from 'firebase/database';
import { db } from '../index.jsx'; 

// Points multipliers for different actions
const POINTS_MULTIPLIERS = {
  recycled: 2.0,
  composted: 2.5,
  reused: 2.0,
  repurposed: 2.0,
  other: 0.5,
  landfill: 0.5
};

// Amount multipliers
const AMOUNT_MULTIPLIERS = {
  small: 1,
  medium: 2,
  large: 3
};

// Calculate points for an entry
export function calculatePoints(entry) {
  const { action, amount } = entry;
  let totalPoints = 0;
  
  const amountMultiplier = AMOUNT_MULTIPLIERS[amount] || 1;
  
  // Calculate points for each action
  action.forEach(actionType => {
    const basePoints = 10; // Base points per action
    const actionMultiplier = POINTS_MULTIPLIERS[actionType] || 0.5;
    totalPoints += basePoints * actionMultiplier * amountMultiplier;
  });
  
  return Math.round(totalPoints);
}

// Save a new log entry
export async function saveLog(entry) {
  try {
    const points = calculatePoints(entry);
    const entryWithPoints = {
      ...entry,
      points,
      createdAt: Date.now()
    };
    
    const logsRef = ref(db, 'logs');
    const newLogRef = push(logsRef);
    await set(newLogRef, entryWithPoints);
    
    // Update user points
    await updateUserPoints(entry.userId || 'default', points);
    
    return { success: true, id: newLogRef.key };
  } catch (error) {
    console.error('Error saving log:', error);
    return { success: false, error: error.message };
  }
}

// Update an existing log entry
export async function updateLog(logId, entry) {
  try {
    const points = calculatePoints(entry);
    const entryWithPoints = {
      ...entry,
      points,
      updatedAt: Date.now()
    };
    
    // Get the old entry to calculate point difference
    const oldEntrySnapshot = await get(ref(db, `logs/${logId}`));
    const oldPoints = oldEntrySnapshot.exists() ? oldEntrySnapshot.val().points : 0;
    
    const logRef = ref(db, `logs/${logId}`);
    await set(logRef, entryWithPoints);
    
    // Update user points with the difference
    const pointsDifference = points - oldPoints;
    await updateUserPoints(entry.userId || 'default', pointsDifference);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating log:', error);
    return { success: false, error: error.message };
  }
}

// Delete a log entry
export async function deleteLog(logId) {
  try {
    // Get the entry to subtract points
    const entrySnapshot = await get(ref(db, `logs/${logId}`));
    if (entrySnapshot.exists()) {
      const entry = entrySnapshot.val();
      await updateUserPoints(entry.userId || 'default', -entry.points);
    }
    
    const logRef = ref(db, `logs/${logId}`);
    await remove(logRef);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting log:', error);
    return { success: false, error: error.message };
  }
}

// Load all logs
export async function loadLogs(userId = 'default') {
  try {
    const logsRef = ref(db, 'logs');
    const snapshot = await get(logsRef);
    
    if (snapshot.exists()) {
      const logs = [];
      snapshot.forEach((childSnapshot) => {
        const log = childSnapshot.val();
        if (!userId || log.userId === userId) {
          logs.push({
            id: childSnapshot.key,
            ...log
          });
        }
      });
      return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return [];
  } catch (error) {
    console.error('Error loading logs:', error);
    return [];
  }
}

// Listen to logs changes in real-time
export function listenToLogs(callback, userId = 'default') {
  const logsRef = ref(db, 'logs');
  
  const unsubscribe = onValue(logsRef, (snapshot) => {
    if (snapshot.exists()) {
      const logs = [];
      snapshot.forEach((childSnapshot) => {
        const log = childSnapshot.val();
        if (!userId || log.userId === userId) {
          logs.push({
            id: childSnapshot.key,
            ...log
          });
        }
      });
      callback(logs.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else {
      callback([]);
    }
  });
  
  return unsubscribe;
}

// Update user points
async function updateUserPoints(userId, pointsToAdd) {
  try {
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);
    
    let currentPoints = 0;
    let userName = 'Anonymous';
    
    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      currentPoints = userData.points || 0;
      userName = userData.name || 'Anonymous';
    }
    
    const newPoints = Math.max(0, currentPoints + pointsToAdd);
    
    await set(userRef, {
      name: userName,
      points: newPoints,
      lastUpdated: Date.now()
    });
    
    return newPoints;
  } catch (error) {
    console.error('Error updating user points:', error);
    return 0;
  }
}

// Get user data
export async function getUserData(userId = 'default') {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    
    // Create default user if doesn't exist
    const defaultUser = {
      name: 'Anonymous',
      points: 0,
      lastUpdated: Date.now()
    };
    
    await set(userRef, defaultUser);
    return defaultUser;
  } catch (error) {
    console.error('Error getting user data:', error);
    return { name: 'Anonymous', points: 0 };
  }
}

// Get leaderboard data
export async function getLeaderboardData() {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    
    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        users.push({
          id: childSnapshot.key,
          user: user.name || 'Anonymous',
          points: user.points || 0,
          lastUpdated: user.lastUpdated
        });
      });
      
      // Sort by points and add ranks and classes
      const sortedUsers = users
        .sort((a, b) => b.points - a.points)
        .map((user, index) => ({
          ...user,
          rank: index + 1,
          className: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
        }));
      
      return sortedUsers;
    }
    return [];
  } catch (error) {
    console.error('Error getting leaderboard data:', error);
    return [];
  }
}

// Listen to leaderboard changes
export function listenToLeaderboard(callback) {
  const usersRef = ref(db, 'users');
  
  const unsubscribe = onValue(usersRef, (snapshot) => {
    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        users.push({
          id: childSnapshot.key,
          user: user.name || 'Anonymous',
          points: user.points || 0,
          lastUpdated: user.lastUpdated
        });
      });
      
      const sortedUsers = users
        .sort((a, b) => b.points - a.points)
        .map((user, index) => ({
          ...user,
          rank: index + 1,
          className: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
        }));
      
      callback(sortedUsers);
    } else {
      callback([]);
    }
  });
  
  return unsubscribe;
}

// Add a new user to leaderboard
export async function addUserToLeaderboard(userName) {
  try {
    const usersRef = ref(db, 'users');
    const newUserRef = push(usersRef);
    await set(newUserRef, {
      name: userName,
      points: 0,
      lastUpdated: Date.now()
    });
    return { success: true, id: newUserRef.key };
  } catch (error) {
    console.error('Error adding user:', error);
    return { success: false, error: error.message };
  }
}

// Get analytics data for visualizations
export async function getAnalyticsData(userId = 'default') {
  try {
    const logs = await loadLogs(userId);
    const userData = await getUserData(userId);
    
    // Calculate waste composition
    const wasteComposition = {
      recycled: 0,
      composted: 0,
      reused: 0,
      repurposed: 0,
      other: 0
    };
    
    logs.forEach(log => {
      log.action.forEach(action => {
        if (wasteComposition.hasOwnProperty(action)) {
          wasteComposition[action]++;
        }
      });
    });
    
    // Calculate points progress over the last 7 days
    const today = new Date();
    const last7Days = [];
    const pointsProgress = {
      labels: [],
      data: []
    };
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      last7Days.push(dateStr);
      pointsProgress.labels.push(`Day ${7 - i}`);
    }
    
    let cumulativePoints = 0;
    last7Days.forEach(dateStr => {
      const dayLogs = logs.filter(log => log.date === dateStr);
      const dayPoints = dayLogs.reduce((sum, log) => sum + (log.points || 0), 0);
      cumulativePoints += dayPoints;
      pointsProgress.data.push(cumulativePoints);
    });
    
    // Get user rank
    const leaderboard = await getLeaderboardData();
    const userRank = leaderboard.findIndex(user => user.id === userId) + 1;
    const rankSuffix = userRank === 1 ? 'st' : userRank === 2 ? 'nd' : userRank === 3 ? 'rd' : 'th';
    
    return {
      totalPoints: userData.points || 0,
      rank: userRank > 0 ? `${userRank}${rankSuffix}` : 'Unranked',
      wasteComposition,
      pointsProgress
    };
  } catch (error) {
    console.error('Error getting analytics data:', error);
    return {
      totalPoints: 0,
      rank: 'Unranked',
      wasteComposition: { recycled: 0, composted: 0, reused: 0, repurposed: 0, other: 0 },
      pointsProgress: { labels: [], data: [] }
    };
  }
} 