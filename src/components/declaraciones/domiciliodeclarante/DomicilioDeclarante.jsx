import { Text } from "../../Reusables/input/Input";
import { Formulario } from "../../Reusables/formulario/Formulario";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { Number } from "../../Reusables/number/Number";
import { Password } from "../../Reusables/password/Password";
import { TextArea } from "../../Reusables/textaerea/TextAerea";
import { Phone } from "../../Reusables/phone/Phone";
import { Email } from "../../Reusables/email/Email";
import { Curp } from "../../Reusables/curp/Curp";
import { Rfc } from "../../Reusables/rfc/rfc";
import { useEffect } from "react";
import { Date } from "../../Reusables/date/Date";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { CustomCheckbox } from "../../Reusables/checkbox/Inpcheckbox";
import { Card, CardContent, Grid, Typography } from "@mui/material";
export const DomicilioDeclarante = ({ next, previous }) => {
  return (
    <>
      <Card
        sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }}
        TouchRippleProps={{ disabled: true }}
      >
        <CardContent>
          <Typography
            variant="h6"
            align="start"
            color="textPrimary"
            style={{ fontWeight: "500" }}
          >
            Los datos que no serán públicos estarán resaltados de color verde
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            <Grid container spacing={2}>
              <Formulario
                stepper={true}
                stepperText={"regresar"}
                stepperFunction={previous}
                action={""}
                submit={next}
                textButton={"Registrar"}
                title={"Declaración de situación patrimonial - Inicial"}
              >
                <Text col={12} name="Calle" label={"Calle"} color={"green"} />
                <Number
                  col={4}
                  name="Número Exterior"
                  label={"Número Exterior"}
                  color="green"
                />
                <Number
                  col={4}
                  name="Número Interior"
                  label={"Número Interior"}
                  color="green"
                />
                <TextArea
                  placeholder={"Otros motivos"}
                  col={12}
                  rows={10}
                  name="aclaraciones"
                  optional={true}
                  color="green"
                  label={"Aclaraciones/Observaciones"}
                />
              </Formulario>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
