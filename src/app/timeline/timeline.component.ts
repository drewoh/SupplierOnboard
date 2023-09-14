// timeline.component.ts

import { Component } from '@angular/core';

interface Substep {
  time: string;
  description: string;
  completed: boolean;
}

interface MainStep {
  time: string;
  title: string;
  description: string;
  completed: boolean;
  substeps: Substep[];
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  progress: MainStep[] = [
    {
        time: "", title: "Supplier Onboarding Start", description: "", completed: false,
        substeps: [
        ],
    },
    {
        time: "", title: "Initiation", description: "Supplier Onboarding Initiated by Team", completed: false,
        substeps: [
          { time: "", description: "Welcome email automatically sent to Contractor (Supplier CCed)", completed: false },
        ],
    },
    {
        time: "", title: "HR takes action from supplier dashboard", description: "(if needed request documents)", completed: false, substeps:[]
    },
    {
        time: "", title: "Emails sent to required parties", description: "", completed: false,
        substeps: [
          { time: "", description: "Supplier recieves email 1 providing instructions and credentials to portal", completed: false },
          { time: "", description: "Supplier receives email 2 with link to online MSA document to fill", completed: false },
          { time: "", description: "Contractor receives email with link to online BCG document to fill", completed: false },
        ],
    },
    {
        time: "", title: "Signatures", description: "", completed: false,
        substeps: [
          { time: "", description: "Supplier signs the online documents", completed: false },
          { time: "", description: "Contractor signs the online documents", completed: false },
        ],
    },
    {
        time: "", title: "Signatures", description: "HR validates received documents and approves onboarding", completed: false,
        substeps: [
        ],
    },
  ];

  getCurrentTime(): string {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
  }

  areAllSubstepsCompleted(mainStep: MainStep): boolean {
    return mainStep.substeps.every(substep => substep.completed);
  }

  completeStep(index: number): void {
    if (this.areAllSubstepsCompleted(this.progress[index])) {
      const currentTime = this.getCurrentTime();
      this.progress[index].completed = true;
      this.progress[index].time = currentTime;
    }
  }

  completeSubstep(mainIndex: number, subIndex: number): void {
    const currentTime = this.getCurrentTime();
    this.progress[mainIndex].substeps[subIndex].completed = true;
    this.progress[mainIndex].substeps[subIndex].time = currentTime;
  }

  isFirstUncompletedStep(mainIndex: number): boolean {
    const firstIncompleteStep = this.progress.find(step => step.completed === false);
    if (firstIncompleteStep) {
      console.log(mainIndex, this.progress.indexOf(firstIncompleteStep))
      return this.progress.indexOf(firstIncompleteStep) == mainIndex;
    }
    return false; // Handle case where no incomplete step is found
  }

}
