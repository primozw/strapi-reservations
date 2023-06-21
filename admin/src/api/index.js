import axiosInstance from '../utils/axiosInstance';

const api = {

  /** Reservations */
  getSettings: async () => {
    return await axiosInstance.get(`/strapi-reservations/settings`);
  },
  setSettings: async data => {
    return await axiosInstance.post(`/strapi-reservations/settings`, data);
  },

  /** Reservations */
  getReservations: async ( date ) => {
    return await axiosInstance.get(`/strapi-reservations`, {
      params: {
        date
      }
    });
  },
  confirmReservation: async ( data ) => {
    return await axiosInstance.post(`/strapi-reservations/confirm`, data);
  }, 

  cancelReservation: async ( data ) => {
    return await axiosInstance.post(`/strapi-reservations/cancel`, data);
  }, 

  /** Time slots */
  getMonthlyTimeSlots: async ( date,  controller) => {
    return await axiosInstance.get(`/strapi-reservations/time-slots/month/${date}`, {
      signal: controller.signal
    });
  },

  /** Schedules */
  getSchedule: async (id) => {
    return await axiosInstance.get(`/strapi-reservations/schedule/${id}`);
  },
  createSchedule: async data => {
    return await axiosInstance.post(`/strapi-reservations/schedule`, data);
  },
  updateSchedule: async data => {
    return await axiosInstance.put(`/strapi-reservations/schedule`, data);
  },
  deleteSchedule: async id => {
    return await axiosInstance.delete(`/strapi-reservations/schedule/${id}`);
  },

  getSchedules: async () => {
    return await axiosInstance.get(`/strapi-reservations/schedules`);
  },
  updateSchedules: async data => {
    return await axiosInstance.put(`/strapi-reservations/schedules`, data);
  },

};
export default api;