import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // Construct the full URL
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies */
  static async getCompanies() {
    let res = await this.request('companies');
    return res.companies;
  }

  /** Get jobs by search term */
  static async getJobs(data) {
    let res = await this.request('jobs', data);
    return res.jobs;
  }

  /** Get user profile */
  static async getUserProfile(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Register a new user */
  static async registerUser(userData) {
    let res = await this.request('auth/register', userData, 'post');
    return res.token;
  }

  /** Login a user */
  static async loginUser(credentials) {
    let res = await this.request('auth/token', credentials, 'post');
    return res.token;
  }

  /** Save a job for the user */
  static async saveJob(jobId) {
    let res = await this.request(`users/me/jobs/${jobId}`, {}, 'post');
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
