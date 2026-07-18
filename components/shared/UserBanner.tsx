import React from "react";
import { Mail, MessageCircle } from "lucide-react";

const UserBanner = () => {
    return (
        <div className="mx-auto mb-10 max-w-4xl rounded-xl border border-blue-100 bg-blue-50/50 px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center text-sm text-slate-600 sm:text-left">
                    <span className="font-semibold text-slate-800">
                        Have news or an event to share?
                    </span>{" "}
                    Reach out and we&apos;ll feature it here.
                </p>

                <div className="flex shrink-0 items-center justify-center gap-2">
                    <a
                        href="mailto:researchmindsnetlk@gmail.com"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-600"
                    >
                        <Mail className="h-3.5 w-3.5" />
                        Email
                    </a>

                    <a
                        href="https://wa.me/94713320561"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-600"
                    >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserBanner;