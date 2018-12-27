import * as _ from 'lodash';
import {Lesson} from "../shared/model/lesson";

export interface Observer {
  next(data: any);
}

export interface Observable {
  subscribe(obs: Observer);

  unsubscribe(obs: Observer);
}

interface Subject extends Observer, Observable {

}

class SubjectImpl implements Subject {
  private observers: Observer[] = [];

  next(data: any) {
    this.observers.forEach(obs => obs.next(data));
  }

  subscribe(obs: Observer) {
    this.observers.push(obs);
  }

  unsubscribe(obs: Observer) {
    _.remove(this.observers, el => el === obs);
  }

}

const lessonListSubject = new SubjectImpl();

export let lessonsList$: Observable = {
  subscribe: obs => {
    lessonListSubject.subscribe(obs);
    obs.next(lessons);
  },
  unsubscribe: obs => lessonListSubject.unsubscribe(obs)
};

let lessons: Lesson[] = [];

export function initializeLessonList(newList: Lesson[]) {
  lessons = _.cloneDeep(newList);
  lessonListSubject.next(lessons);
}
