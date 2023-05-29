package pe.cibertec.proyecto.request;

import lombok.Data;

@Data
public class ProductosRequest {
	
	private Integer id_producto;
	
	private String pdt_foto;
	
	private String pdt_producto;
	
	private Integer pdt_porcion;
	
	private Integer pdt_tortaCompleta;
	
	private double pdt_precioPorcion;
	
	private double pdt_precioCompleta;
	
	private String codigo;

}
