export function generateRandomAlignment(length) {
    let sequence = "";
    for (let i = 0; i < length; i++) {
        sequence += "ACDEFGHIKLMNPQRSTVWY"[Math.floor(Math.random() * 20)];
    }
    return {
        name: "Random",
        sequence
    }
}