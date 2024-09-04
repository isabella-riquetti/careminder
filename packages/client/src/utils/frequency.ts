import { Frequency, FrequencyType } from "@careminder/shared/types";
import pluralize from "pluralize";

import { joinWithCommaAnd } from "./array";

export function readableFrequency({ frequency, frequency_type, on, special }: Frequency): string {
    if (special) return "On special occasions";
    if (!frequency || !frequency_type) return "As needed";

    const frequencyText = [];
    if (frequency) {
        frequencyText.push("Every");
        if(frequency > 1) frequencyText.push(frequency)
        frequencyText.push(pluralize(frequency_type, frequency ?? 1));
    }
    if (on?.length) {
        frequencyText.push(`${frequency_type === FrequencyType.HOUR || frequency_type === FrequencyType.DAY ? 'at' : 'on'}`);
        frequencyText.push(joinWithCommaAnd(on));
    }

    return frequencyText.join(" ");
}
