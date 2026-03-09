import React from "react";

export default function AssessmentCard() {

    return (
        <>
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03] backdrop-blur-sm">
                <div className="mx-10 my-7">
                    <div> Questions ?</div>
                    <div className="mt-2">
                        <div className="flex gap-4">
                            <input type="radio" name="options" value="value 1" id="option1" />
                            <label htmlFor="option1">Options 1</label>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <input type="radio" name="options" value="value 2" id="option2" />
                            <label htmlFor="option2">Options 2</label>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <input type="radio" name="options" value="value 3" id="option3" />
                            <label htmlFor="option3">Options 3</label>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <input type="radio" name="options" value="value 4" id="option4" />
                            <label htmlFor="option4">Options 4</label>
                        </div>
                    </div>

                    <div className="flex justify-between mt-5">
                        <button className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-500">
                            Previous
                        </button>
                        <button className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-500">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}