import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SubmitHandler, useForm } from "react-hook-form";
import { Database } from "../../supabaseTypes.ts";
import { usePostNewSection } from "../../utils/useQuerySupabase.ts";
type Inputs = Database["public"]["Tables"]["sections"]["Row"];
function CreateNewSection({ projectId }: { projectId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const { mutate: addSection } = usePostNewSection();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.id = crypto.randomUUID();
    data.projectId = projectId;
    data.createdAt = new Date().toDateString();
    addSection(data);
    reset();
  };

  return (
    <>
      <Accordion
        sx={{
          background: "transparent",
          fontSize: "2em",
          pb: 2,
          color: "rgba(95,158,160,0.75)",
          "&:hover": {
            color: "rgba(95,158,160)",
          },
        }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color={"secondary"} />}
          color={"secondary"}
        >
          Add a new Section
        </AccordionSummary>
        <AccordionDetails color={"secondary"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width={"100%"} spacing={2}>
              <TextField
                label="Title"
                variant="outlined"
                {...register("title", {
                  required: "** Section Title must be entered! **",
                })}
              />
              {errors.title && (
                <Typography variant={"subtitle1"} color={"cadetblue"}>
                  {errors.title.message}
                </Typography>
              )}
              <TextField
                label="Description"
                variant="outlined"
                {...register("description")}
              />
              <TextField
                sx={{
                  '& input[type="date"]::-webkit-calendar-picker-indicator': {
                    filter: "invert(1) brightness(1.5)",
                    cursor: "pointer",
                  },
                }}
                variant="outlined"
                type={"date"}
                {...register("deadline")}
              />
              <Button type={"submit"}>Add Section </Button>
            </Stack>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default CreateNewSection;
