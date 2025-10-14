export interface FieldActivity {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  careGrade: string;
  service: string;
}

export interface EducationActivity {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  educationType: string;
  hours: string;
}

export interface ActivitiesData {
  field: FieldActivity[];
  education: EducationActivity[];
}
