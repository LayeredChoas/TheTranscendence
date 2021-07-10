
export default function get_avatar(params) {

  try {
    const path = "/uploads/" + params.split("/uploads/")[1];
    const val  = fetch(path)
      .then(function (response) {
        return response.blob();
      })
      .then(function (res) {
        let imgObjectURL = URL.createObjectURL(res);
        console.log(imgObjectURL);
        if (imgObjectURL) {
            return imgObjectURL;
        }
      });
  } catch (error) {
      return ""
  }
}
