$(document).on("click", "#btnAgregarProducto", function(){
	$("#txtcodiProd").val("");
	$("#txtfotoProd").val("");
	$("#txtnombreProd").val("");
	$("#txtporcionesProd").val("");
	$("#txttortaProd").val("");
	$("#txtprecioporProd").val("");
	$("#txtpreciotorProd").val("");


	$("#modale-pro").modal("show");
})



$(document).on("click", ".btnmod", function(){
	$.ajax({
		type: "POST",
		url: "/productos/registrarProductos",
		contentType: "application/json",
		data: JSON.stringify({
			id_producto: $("txtcodiProd").val(),
			pdt_foto: $("#txtfotoProd").val(),
			pdt_producto: $("#txtnombreProd").val(),
			pdt_porcion: $("#txtporcionesProd").val(),
			pdt_tortaCompleta: $("#txttortaProd").val(),
			pdt_precioPorcion: $("#txtprecioporProd").val(),
			pdt_precioCompleta: $("#txtpreciotorProd").val()
		}),
		success: function(resultado){
			alert(resultado.mensaje);
			ListarProducto();
		}
	});
	$("#modale-pro").modal("hide");
})



$(document).on("click", ".btnactualizarProductos", function(){
	$("#txtcodiProd").val($(this).attr("data-id_producto"));
	$("#txtfotoProd").val($(this).attr("data-pdt_foto"));
	$("#txtnombreProd").val($(this).attr("data-pdt_producto"));
	$("#txtporcionesProd").val($(this).attr("data-pdt_porcion"));
	$("#txttortaProd").val($(this).attr("data-pdt_tortaCompleta"));
	$("#txtprecioporProd").val($(this).attr("data-pdt_precioPorcion"));
	$("#txtpreciotorProd").val($(this).attr("data-precioCompleta"));
	$("#modalSala").modal("show");
});



$(document).on("click", ".btneliminarProductos", function(){
	$.ajax({
		type: "DELETE",
		contentType: 'application/json',
		url: "/productos/eliminarProductos",
		data: JSON.stringify({
			id_producto: $("#hddidcliente").val()
		}),
		success: function(resultado){
			console.log(resultado)
			alert(resultado.mensaje);
			
		}
	})
	
});


