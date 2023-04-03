import React from "react";

function Alert({ type, message }: { type?: "success" | "warning" | "error", message: string }) {
    let backgroundColor, textColor;
    let symbl = {
        "success": "check2-circle",
        "warning": "exclamation-circle",
        "error": "bug"
    }


    switch (type) {
        case "success":
            backgroundColor = "bg-green-200";
            textColor = "text-black";
            break;
        case "warning":
            backgroundColor = "bg-yellow-200";
            textColor = "text-black";
            break;
        case "error":
            backgroundColor = "bg-red-200";
            textColor = "text-black";
            break;
        default:
            backgroundColor = "bg-gray-200";
            textColor = "text-black";
    }

    return (
        <div
            className={`py-4 px-6 rounded-md ${backgroundColor} ${textColor} sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-4`}
        >

            <p>  <i className={`bi bi-${type ? symbl[type] : ""} mx-3`}></i> {message}</p>
        </div>
    );
};

export default Alert;


