import { Schema, model } from 'mongoose';

interface apointment {
  title: string,
  begins: Date,
  ends: Date,
  feedback: 'positive' | 'negative',
  comments: string
}

interface location {
  country: string,
  city: string
}


interface interview {
  userId: string,
  company: {
    name: string,
    url: string
  },
  region: {
    locations: location[],
    remoteStatus: 'full remote' | 'remote/onsite' | 'onsite'
  },
  applicationUrl: string,
  apointments: apointment[],
  stackInfo: string[],
  improveSelf: string,
  notes: string[],
  status: 'draft' | 'applied' | 'ongoing' | 'reject' | 'offer' | 'finalized',
  isActive: boolean
}

const interviewSchema = new Schema<interview>({
  userId: { type: String, required: true },
  company: { type: Object, required: true },
  region: Object,
  applicationUrl: String,
  apointments: Array,
  stackInfo: Array,
  improveSelf: String,
  notes: Array,
  status: { type: String, required: true },
  isActive: { type: Boolean, required: true }
}, { timestamps: true });

export default model('Interview', interviewSchema);