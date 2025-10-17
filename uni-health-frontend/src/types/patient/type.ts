export interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
    color: string;
    trend?: string;
  }

export interface QuickActionButtonProps {
    icon: React.ElementType;
    label: string;
    color: string;
    onClick?: () => void;
  }


export interface Vitals {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  bmi: number;
}

export interface MedicalVisit {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  hospital: string;
  diagnosis: string;
  detailedNotes: string;
  vitals: Vitals;
  treatmentPlan: string;
  followUp: string;
  attachments: string[];
  doctorCredentials: string;
}

export interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  specialty: string;
  prescriptionDate: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  refillsRemaining: number;
  pharmacy: string;
  pharmacyPhone: string;
  instructions: string;
  sideEffects: string[];
  interactions: string[];
  status: string;
}

export interface LabResult {
  parameter: string;
  value: number;
  unit: string;
  normalRange: string;
  status: string;
}

export interface HistoricalData {
  date: string;
  value: number;
}

export interface LabTest {
  id: number;
  testName: string;
  date: string;
  orderedBy: string;
  hospital: string;
  status: string;
  results: LabResult[];
  doctorNotes: string;
  historicalData: HistoricalData[];
}

export interface ImagingStudy {
  id: number;
  studyType: string;
  date: string;
  orderedBy: string;
  facility: string;
  status: string;
  radiologistReport: string;
  findings: string;
  images: string[];
  radiologist: string;
  radiologistCredentials: string;
}

export interface Document {
  id: number;
  name: string;
  category: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
}

export interface FilteredData {
  visits: MedicalVisit[];
  prescriptions: Prescription[];
  labs: LabTest[];
  imaging: ImagingStudy[];
}

// Prescription Component
export interface PrescriptionProps {
  filtered: FilteredData;
  selectedRecords: number[];
  toggleRecordSelection: (id: number) => void;
}