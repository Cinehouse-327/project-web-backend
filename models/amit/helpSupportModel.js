import mongoose from 'mongoose';

/**
 * @typedef {Object} HelpSupport
 * @property {mongoose.Types.ObjectId} supportId - Unique identifier for the help & support entry.
 * @property {mongoose.Types.ObjectId} userId - The ID of the user who raised the query.
 * @property {string} question - The user's query or issue.
 * @property {string|null} response - The response provided by the support team.
 * @property {('Open'|'In Progress'|'Resolved'|'Closed')} status - Current status of the query.
 * @property {Date} createdAt - Timestamp when the query was created.
 * @property {Date} updatedAt - Timestamp of the last update to the query.
 */

/**
 * Schema representing the help & support queries in the system.
 * @type {mongoose.Schema<HelpSupport>}
 */
const helpSupportSchema = new mongoose.Schema({
  /**
   * Unique identifier for the help & support entry.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  supportId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },

  /**
   * The ID of the user who raised the query.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required
   */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  /**
   * The user's query or issue.
   * @type {string}
   * @required
   */
  question: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * The response provided by the support team.
   * @type {string|null}
   */
  response: {
    type: String,
    default: null,
  },

  /**
   * Current status of the query.
   * @type {('Open'|'In Progress'|'Resolved'|'Closed')}
   * @default 'Open'
   */
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },

  /**
   * Timestamp when the query was created.
   * @type {Date}
   * @default Date.now
   */
  createdAt: {
    type: Date,
    default: Date.now,
  },

  /**
   * Timestamp of the last update to the query.
   * @type {Date}
   * @default Date.now
   */
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * HelpSupport model for interacting with the help & support queries in the database.
 * @type {mongoose.Model<HelpSupport>}
 */
export const HelpSupport = mongoose.model('HelpSupport', helpSupportSchema);
