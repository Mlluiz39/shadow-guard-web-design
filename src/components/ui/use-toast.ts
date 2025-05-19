
// We're using sonner toast directly and not exporting useToast since it doesn't exist
import { toast } from "sonner";

export { toast };
// Re-export a compatibility function for any code that might expect useToast
export const useToast = () => ({ toast });
