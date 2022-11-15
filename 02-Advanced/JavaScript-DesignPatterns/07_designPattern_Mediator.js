// ... Category: Mediator Pattern
// Purpose:
// Define Objects

function Participant(name) {
    this.name = name;
    this.meetingGroup = null;
}
Participant.prototype = {
    send: function (data, receiver) {
        const sender = this;
        this.meetingGroup.send(data, sender, receiver);
    },
    receive: function (data, sender, meetingGroup) {
        console.log(`Data received!!!\nfrom\n${sender.name}\t(from Meeting Group: ${meetingGroup.name})\nTo\n${this.name}\t(at Meeting Group: ${meetingGroup.name})\nData:\t${data}`);
    }
}

function MeetingGroup(name) {   // Define the Mediator
    this.name = name;
    this.participants = {};
}
MeetingGroup.prototype = {
    addParticipant: function (participant) {
        this.participants[participant.name] = participant;
        participant.meetingGroup = this;
    },
    send: function (data, sender, receiver) {
        const meetingGroup = this;
        receiver.receive(data, sender, meetingGroup);
    }
}

const meetingGroupA = new MeetingGroup("Group A");
const meetingGroupB = new MeetingGroup("Group B");
const meetingGroupC = new MeetingGroup("Group C");

// All Participants
const participant1 = new Participant("Participant 1");
const participant2 = new Participant("Participant 2");
const participant3 = new Participant("Participant 3");
const participant4 = new Participant("Participant 4");
const participant5 = new Participant("Participant 5");
const participant6 = new Participant("Participant 6");
const participant7 = new Participant("Participant 7");

// Meeting Group A
meetingGroupA.addParticipant(participant1);
meetingGroupA.addParticipant(participant2);
meetingGroupA.addParticipant(participant3);

// Meeting Group B
meetingGroupB.addParticipant(participant4);
meetingGroupB.addParticipant(participant5);

// Meeting Group C
meetingGroupC.addParticipant(participant6);
meetingGroupC.addParticipant(participant7);

// Start Communications
participant1.send("Hi P 2", participant2);
participant2.send("Hi P 3", participant3);
participant5.send("Hi P 4", participant4);
participant6.send("Hi P 7", participant7);