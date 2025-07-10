import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            pageNumbers.push(i);
        } else if (
            i === currentPage - 2 ||
            i === currentPage + 2
        ) {
            pageNumbers.push("...");
        }
    }

    return (
        <div className="flex items-center justify-center gap-1 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline btn-primary"
            >
                <FaAngleLeft />
            </button>
            {pageNumbers.map((number, index) => (
                <button
                    key={index}
                    onClick={() => typeof number === "number" && onPageChange(number)}
                    disabled={number === "..."}
                    className={`btn btn-sm ${number === currentPage ? "btn-primary text-white" : "btn-outline btn-primary"}`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline btn-primary"
            >
                <FaAngleRight />
            </button>
        </div>
    );
};

export default Pagination;
