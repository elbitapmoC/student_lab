"use client";

import { useEffect, useRef, useState } from "react";
import type { AppointmentPage } from "../../lib/appointments";
import AppointmentSearch from "./AppointmentSearch";
import AppointmentTable from "./AppointmentTable";

type AppointmentListProps = {
  initialPage: AppointmentPage;
};

export function AppointmentList({ initialPage }: AppointmentListProps) {
  const [resultPage, setResultPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(initialPage.page);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setErrorMessage("");
    const timeoutId = window.setTimeout(async () => {
      const params = new URLSearchParams({
        patientName: searchTerm.trim(),
        page: String(page),
        pageSize: String(initialPage.pageSize),
      });

      try {
        const response = await fetch(`/api/apps?${params}`, {
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            typeof result.error === "string"
              ? result.error
              : `Search failed (${response.status}).`,
          );
        }

        setResultPage(result as AppointmentPage);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Could not search appointments.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [initialPage.pageSize, page, searchTerm]);

  const pageCount = Math.max(
    1,
    Math.ceil(resultPage.total / resultPage.pageSize),
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setPage(1);
  }

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-[#e8eeea] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#183c36]">
            Appointment list
          </h2>
          <p
            className="mt-1 text-sm text-[#73867f]"
            aria-live="polite"
            aria-atomic="true"
          >
            {isLoading
              ? "Searching appointments..."
              : `Showing ${resultPage.appointments.length} of ${resultPage.total} appointments`}
          </p>
        </div>
        <AppointmentSearch
          value={searchTerm}
          onValueChange={handleSearchChange}
        />
      </div>

      {errorMessage && (
        <p role="alert" className="border-b border-rose-100 px-6 py-3 text-sm text-rose-700">
          {errorMessage}
        </p>
      )}

      <AppointmentTable appointments={resultPage.appointments} />

      {pageCount > 1 && (
        <nav
          aria-label="Appointment pages"
          className="flex items-center justify-between border-t border-[#e8eeea] px-5 py-4 sm:px-6"
        >
          <p className="text-sm text-[#73867f]">
            Page {page} of {pageCount}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page <= 1 || isLoading}
              className="rounded-lg border border-[#d5dfd9] px-3 py-2 text-sm font-medium text-[#315e54] hover:bg-[#f7f9f8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={page >= pageCount || isLoading}
              className="rounded-lg border border-[#d5dfd9] px-3 py-2 text-sm font-medium text-[#315e54] hover:bg-[#f7f9f8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
