type Session = {
    user: number,
    duration: number,
    equipment: String[],
};

// const session: Array<Session> = [
//     { user: 8, duration: 50, equipment: ['bench'] },
//     { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
//     { user: 8, duration: 50, equipment: ['bench'] },
//     { user: 7, duration: 150, equipment: ['bench', 'kettlebell'] },
// ];

const dataMerge = (session: Array<Session>): Array<Session> => {
    const map: Map<number, Session> = new Map();
    for(const sess of session) {
        if(map.has(sess.user)) {
            const existingSession: Session = map.get(sess.user)!;
            existingSession.duration += sess.duration;
            const equipmentSet: Set<String> = new Set(existingSession.equipment);
            for(const eq of sess.equipment) {
                equipmentSet.add(eq);
            }
            existingSession.equipment = Array.from(equipmentSet).sort();
        } else {
            const newSession = {
                user: sess.user,
                equipment: sess.equipment,
                duration: sess.duration,
            }
            map.set(sess.user, newSession);
        }
    }
    
    return Array.from(map.values());
};

// const result = dataMerge(session);
// console.log("result :", result);

export default dataMerge;