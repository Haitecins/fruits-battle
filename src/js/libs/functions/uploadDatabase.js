function uploadDatabase(url, data) {
  $.ajax({
    type: "POST",
    url,
    dataType: "json",
    data,
    success(response) {
      const getTime = response.nowTime;

      if (response.return) {
        console.info(`[${getTime}] ->`, response);
      } else {
        console.error(`[${getTime}] ->`, response.logger);
      }
    },
    error(response) {
      console.error("Unable to upload to server.", response);
    },
  });
}
export default uploadDatabase;
