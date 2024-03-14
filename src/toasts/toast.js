import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

export const Success = (msg) => {
    Toast.fire({
        icon: "success",
        title: msg
    });
};

export const Error = (msg) => {
    Toast.fire({
        icon: "error",
        title: msg
    });
};

export const Warning = (msg) => {
    Toast.fire({
        icon: "warning",
        title: msg
    });
   
};

export const Info = (msg) => {
    Toast.fire({
        icon: "info",
        title: msg
    });
  
};
