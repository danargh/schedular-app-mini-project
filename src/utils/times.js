export const getTimesEveryFifteenMinutes = () => {
   const times = [];
   const startTime = new Date(2023, 0, 1, 0, 0, 0);
   const endTime = new Date(2023, 0, 1, 23, 59, 59);

   while (startTime <= endTime) {
      times.push(startTime.toLocaleTimeString("en-GB", { timeStyle: "short" }));
      startTime.setMinutes(startTime.getMinutes() + 15);
   }

   return times;
};
