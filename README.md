# BodegaVinos

- La idea de esta pagina fue crear una lista de vinos, que le permita al usuario realizar un stock de los vinos que posee en su bodega. Esta lista nos da la opcion de poner el Nombre del Vino, la Fecha de Elavoracion y el Tipo de Uva.
- La lista se guarda en el LocalStorage de nuestro PC y puede ser modificada por el usuario. Con las opciones de:
- - Ordenar la lista por orden de Elavoracion, empezando por los vinos mas viejos, esto mediante un boton y la fecha de elavoracion agregada.
- - Marcar en Amarillo si una vino se encuantra abierto.
- - Poder eliminar un vino si este ya se a acabado, siendo guardados en una lista a la par.
- A su vez la pagina posee otra lista (Vino sin Stock) en la cual se acumulan los vinos ya consumidos, esto con la idea de que el usuario pueda mantener una bodega oraganizada y sepa que vinos no tiene, para asi saber cual o cuales debe comprar.
- Esta lista puede ser eliminada cuando desee, para asi poder seguir agregando vinos.

## Caracteristicas de la Pagina

- Formulario:
- - Nombre del Vino, Fecha de Elavoracion y Tipo de Uva.
- - Boton con la funcion de ordenar la lista de vinos mas viejos a mas nuevos.

- Lista Vinos en Stock:
- - Guardar los vinos agreados con el formulario.
- - Opcion en cada vino de: 
- - - Boton "bierto": nos marca el vino en amarillo.
- - - Boton "Eliminar": elimina el vino y nos lo mueve a la lista "Vinos sin stock".

- Lista Vinos sin Stock:
- - Guardar los vinos eliminados de la lista "Vinos en Stock".
- - Boton "Limpiar Bodega": elimina todos los vinos guardados en la lista de "Vinos sin Stock".
