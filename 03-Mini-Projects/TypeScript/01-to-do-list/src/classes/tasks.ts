import { HasGetSummary } from "../interfaces/required-methods";
import {
  HasTaskName,
  HasTaskDeadline,
  HasTaskCategory,
} from "../interfaces/required-properties";

class Task
  implements HasGetSummary, HasTaskName, HasTaskDeadline, HasTaskCategory
{
  public taskName: string;
  public taskDeadline: Date;
  public taskCategory: string;

  constructor(taskName: string, taskDeadline: string, taskCategory: string) {
    this.taskName = taskName;
    this.taskDeadline = new Date(taskDeadline);
    this.taskCategory = taskCategory;
  }

  getSummary() {
    return `The task '${this.taskName}' is ${
      this.taskCategory
    }, so must be completed till ${this.taskDeadline
      .toISOString()
      .slice(0, 10)}!'`;
  }
}

export default Task;
