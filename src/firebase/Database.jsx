// firebase/Database.js - Updated with authentication
import { ref, push, set, get, remove, onValue, off } from 'firebase/database';
import { db } from '../index.jsx';

// Points multipliers for different actions
const POINTS_MULTIPLIERS = {
  recycled: 2.0,
  composted: 2.5,
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
  
  // If no action or amount, return 0 points
  if (!action || !amount) return 0;
  
  const basePoints = 10; // Base points per action
  const amountMultiplier = AMOUNT_MULTIPLIERS[amount] || 1;
  const actionMultiplier = POINTS_MULTIPLIERS[action] || 0.5;
  
  const points = basePoints * actionMultiplier * amountMultiplier;
  return Math.round(points);
}

// Save a new log entry
export async function saveLog(entry) {
  try {
    if (!entry.userId) {
      throw new Error('User ID is required');
    }

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
    await updateUserPoints(entry.userId, points);
    
    return { success: true, id: newLogRef.key };
  } catch (error) {
    console.error('Error saving log:', error);
    return { success: false, error: error.message };
  }
}

// Update an existing log entry
export async function updateLog(logId, entry) {
  try {
    if (!entry.userId) {
      throw new Error('User ID is required');
    }

    const points = calculatePoints(entry);
    console.log('New entry points:', points);
    
    const entryWithPoints = {
      ...entry,
      points,
      updatedAt: Date.now()
    };
    
    // Get the old entry to calculate point difference
    const oldEntrySnapshot = await get(ref(db, `logs/${logId}`));
    const oldPoints = oldEntrySnapshot.exists() ? oldEntrySnapshot.val().points : 0;
    console.log('Old entry points:', oldPoints);
    
    const logRef = ref(db, `logs/${logId}`);
    await set(logRef, entryWithPoints);
    
    // Update user points with the difference
    const pointsDifference = points - oldPoints;
    console.log('Points difference:', pointsDifference);
    
    await updateUserPoints(entry.userId, pointsDifference);
    
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
      await updateUserPoints(entry.userId, -entry.points);
    }
    
    const logRef = ref(db, `logs/${logId}`);
    await remove(logRef);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting log:', error);
    return { success: false, error: error.message };
  }
}

// Load all logs for a specific user
export async function loadLogs(userId) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const logsRef = ref(db, 'logs');
    const snapshot = await get(logsRef);
    
    if (snapshot.exists()) {
      const logs = [];
      snapshot.forEach((childSnapshot) => {
        const log = childSnapshot.val();
        if (log.userId === userId) {
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

// Listen to logs changes in real-time for a specific user
export function listenToLogs(callback, userId) {
  if (!userId) {
    callback([]);
    return () => {};
  }

  const logsRef = ref(db, 'logs');
  
  const unsubscribe = onValue(logsRef, (snapshot) => {
    if (snapshot.exists()) {
      const logs = [];
      snapshot.forEach((childSnapshot) => {
        const log = childSnapshot.val();
        if (log.userId === userId) {
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
    if (!userId) {
      throw new Error('User ID is required');
    }

    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);
    
    let currentPoints = 0;
    let userData = {};
    
    if (userSnapshot.exists()) {
      userData = userSnapshot.val();
      currentPoints = userData.points || 0;
    }
    
    const newPoints = Math.max(0, currentPoints + pointsToAdd);
    
    await set(userRef, {
      ...userData,
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
export async function getUserData(userId) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

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

// Update user profile
export async function updateUserProfile(userId, profileData) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);
    
    let existingData = {};
    if (userSnapshot.exists()) {
      existingData = userSnapshot.val();
    }
    
    const updatedData = {
      ...existingData,
      ...profileData,
      lastUpdated: Date.now()
    };
    
    await set(userRef, updatedData);
    return updatedData;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
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
          lastUpdated: user.lastUpdated,
          photoURL: user.photoURL
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
          lastUpdated: user.lastUpdated,
          photoURL: user.photoURL
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

// Get analytics data for visualizations
export async function getAnalyticsData(userId) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const logs = await loadLogs(userId);
    const userData = await getUserData(userId);
    
    // Calculate waste composition
    const wasteComposition = {
      recycled: 0,
      composted: 0,
      landfill: 0
    };
    
    // First count occurrences
    logs.forEach(log => {
      if (wasteComposition.hasOwnProperty(log.action)) {
        wasteComposition[log.action]++;
      }
    });

    // Convert counts to percentages
    const totalActions = Object.values(wasteComposition).reduce((sum, count) => sum + count, 0);
    if (totalActions > 0) {
      Object.keys(wasteComposition).forEach(key => {
        wasteComposition[key] = Math.round((wasteComposition[key] / totalActions) * 100);
      });
    }
    
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
      wasteComposition: { recycled: 0, composted: 0, landfill: 0 },
      pointsProgress: { labels: [], data: [] }
    };
  }
}