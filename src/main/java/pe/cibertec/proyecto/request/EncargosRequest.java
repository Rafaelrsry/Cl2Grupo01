package pe.cibertec.proyecto.request;

import java.sql.Date;

import lombok.Data;

@Data
public class EncargosRequest {

	private Integer id_encargos;
	private Integer enc_idventas;
	private Integer enc_anticipo;
	private Date enc_fechacreacion;
	private Date enc_fechaentrega;
	private String enc_estado;
	
}
