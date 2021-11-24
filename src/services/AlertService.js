import Swal from 'sweetalert2';

export default {
    handleAlerts,
}

 function handleAlerts(title, type) {
    Swal.fire({
        type,
        title,
        showConfirmButton: false,
        timer: 2000
      })
}