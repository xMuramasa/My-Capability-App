// Icons made by freepik, photo3idea_studio, smashicons from https://www.flaticon.com/

export let comidas = [
{
    // legumbres
    title:"100g de Porotos",
    text: `340 calorias,\n 22g de prots,\n 61g de carbs y\n 1g de grasas`,
    image: require("../images/nutricion/beans.png"),
    carb: 61,
    prot: 22,
    grasa: 1,
    cal: 340,
    necesario: 0 //indica si es necesario en la dieta o no (frutas y verduras == 1)
},
{
    title:"100g de Lentejas cocidas",
    text: `165 calorias, 8g de prots, 19g de carbs y 7g de grasas`,
    image: require("../images/nutricion/lentils.png"),
    carb: 18.7,
    prot: 8.4,
    grasa: 6.8,
    cal: 165,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"100g de Garbanzos",
    text: `148 calorias, 8g de prots, 25g de carbs y 3g de grasas`,
    image: require("../images/nutricion/chickpea.png"),
    carb: 24.58,
    prot: 7.82,
    grasa: 2.45,
    cal: 148,
    necesario: 0 //indica si es necesario en la dieta o no
},
// frutos secos
{
    title:"1 porcion de Nueces (28g)",
    text: `183 calorias, 4g de prots, 4g carb y 18g de grasas`,
    image: require("../images/nutricion/nut.png"),
    carb: 4,
    prot: 4,
    grasa: 18,
    cal: 183,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"1 porcion de Almendras (28g)",
    text: `164 calorias, 6g de prots, 6g carb y 14g de grasas`,
    image: require("../images/nutricion/almond.png"),
    carb: 6,
    prot: 6,
    grasa: 14,
    cal: 164,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"1 porcion de Mani (28g)",
    text: `161 calorias, 7g de prots, 5g de carb y 14g de grasas`,
    image: require("../images/nutricion/peanut.png"),
    carb: 5,
    prot: 7,
    grasa: 14,
    cal: 161,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"100g de Quinoa",
    text: "374 calorias, 13g de prots, 69g de carb y 6g de grasas",
    image: require("../images/nutricion/quinoa.png"),
    carb: 69,
    prot: 13,
    grasa: 6,
    cal: 374,
    necesario: 0 //indica si es necesario en la dieta o no
},
// carbohidratos
{
    title:"100g de Fideos",
    text: `137 calorias, 5g de prots, 25g carb y 2g de grasas`,
    image: require("../images/nutricion/pasta.png"),
    carb: 25,
    prot: 4.5,
    grasa: 2,
    cal: 137,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"100g de Arroz blanco",
    text: "129 calorias, 3g de prots, 28g de carb y 0.28g de grasas",
    image: require("../images/nutricion/rice.png"),
    carb: 28,
    prot: 3,
    grasa: 0.28,
    cal: 129,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"Una Marraqueta",
    text: "245 calorias, 6g de prots, 55g de carb y 1g de grasas",
    image: require("../images/nutricion/bread.png"),
    carb: 55,
    prot: 6,
    grasa: 0.77,
    cal: 245,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"1/2 taza de Avena",
    text: "120 calorias, 4g de prots, 20g de carb y 3g de grasas",
    image: require("../images/nutricion/oatmeal.png"),
    carb: 20,
    prot: 3.9,
    grasa: 2.7,
    cal: 120,
    necesario: 0 //indica si es necesario en la dieta o no
},
// proteinas
{
    title:"100g de Salmón",
    text: `146 calorias, 22g de prots y 6g de grasas`,
    image: require("../images/nutricion/fish.png"),
    carb: 0,
    prot: 22,
    grasa: 6,
    cal: 146,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"100g atún en lata",
    text: `116 calorias,\n 25 de prots y\n 1g de grasas`,
    image: require("../images/nutricion/tuna.png"),
    carb: 0,
    prot: 25.51,
    grasa: 0.82,
    cal: 116,
    necesario: 0 //indica si es necesario en la dieta o no (frutas y verduras == 1)
},
{
    title:"100g de Pechuga de pollo",
    text: "195 calorias, 30g de prots y 8g de grasas",
    image: require("../images/nutricion/chicken.png"),
    carb: 0,
    prot: 30,
    grasa: 8,
    cal: 195,
    necesario: 0 //indica si es necesario en la dieta o no
}
,
{
    title:"100g de Pechuga de pavo",
    text: `104 calorias, 17g de prots, 4g de carbs y 2g de grasas`,
    image: require("../images/nutricion/pavo.png"),
    carb: 4.21,
    prot: 17.1,
    grasa: 1.66,
    cal: 104,
    necesario: 0 //indica si es necesario en la dieta o no (frutas y verduras == 1)
},
{
    title:"100g Carne molida res 5% grasa",
    text: "137 calorias, 21g de prots y 5g de grasas",
    image: require("../images/nutricion/meat.png"),
    carb: 0,
    prot: 21.4,
    grasa: 5,
    cal: 137,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"100g de Lomo vetado",
    text: "146 calorias, 22g de prots y 6g de grasas",
    image: require("../images/nutricion/beef.png"),
    carb: 0,
    prot: 22,
    grasa: 6,
    cal: 146,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"Un Sandwich de Pollo",
    text: "265 calorias, 21g de prots, 26g de carb y 8g de grasas",
    image: require("../images/nutricion/sandwich1.png"),
    carb: 26,
    prot: 21,
    grasa: 8,
    cal: 265,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"Un Sandwich de Pavo",
    text: `221 calorias,\n 7 de prots,\n 30g de carbs y\n 8g de grasas`,
    image: require("../images/nutricion/sandwich1.png"),
    carb: 30,
    prot: 7.1,
    grasa: 7.6,
    cal: 221,
    necesario: 0 //indica si es necesario en la dieta o no (frutas y verduras == 1)
},
{
    title:"Un Sandwich de Atún",
    text: `287 calorias,\n 19g de prots,\n 37g de carbs y\n 7g de grasas`,
    image: require("../images/nutricion/sandwich1.png"),
    carb: 36.38,
    prot: 19.01,
    grasa: 7.17,
    cal: 287,
    necesario: 0 //indica si es necesario en la dieta o no (frutas y verduras == 1)
},
//lacteos
{
    title:"100g de Huevo",
    text: "147 calorias, 13g de prots, 0.8g de carb y 10g de grasas",
    image: require("../images/nutricion/egg.png"),
    carb: 0.77,
    prot: 13,
    grasa: 10,
    cal: 147,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"100g de Leche entera",
    text: "60 calorias, 3g de prots, 5g de carb y 3g de grasas",
    image: require("../images/nutricion/milk.png"),
    carb: 5,
    prot: 3,
    grasa: 3,
    cal: 60,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"100g de Yogur",
    text: "63 calorias, 5g de prots, 7g de carb y 2g de grasas",
    image: require("../images/nutricion/yogur.png"),
    carb: 7,
    prot: 5.3,
    grasa: 1.55,
    cal: 63,
    necesario: 0 //indica si es necesario en la dieta o no
},
{
    title:"2 laminas de Queso Gouda",
    text: "71 calorias, 4g de prots, 0.2g de carb y 6g de grasas",
    image: require("../images/nutricion/cheese.png"),
    carb: 0.2,
    prot: 4.4,
    grasa: 5.9,
    cal: 71,
    necesario: 0 //indica si es necesario en la dieta o no
},
//frutas necesario = 1, posicion =  24
{
    title:"Un Plátano",
    text: "105 calorias, 1.3g de prots, 27g de carb y 0.4g de grasas",
    image: require("../images/nutricion/banana.png"),
    carb: 26.95,
    prot: 1.29,
    grasa: 0.4,
    cal: 105,
    necesario: 1 //indica si es necesario en la dieta o no
},
{
    title:"Una Manzana roja mediana",
    text: "72 calorias, 0.4g de prots, 19g de carb y 0.2g de grasas",
    image: require("../images/nutricion/apple.png"),
    carb: 19,
    prot: 0.4,
    grasa: 0.23,
    cal: 72,
    necesario: 1 //indica si es necesario en la dieta o no
},
{
    title:"Una Pera mediana",
    text: "96 calorias, 0.6g de prots, 26g de carb y 0.2g de grasas",
    image: require("../images/nutricion/pear.png"),
    carb: 25.66,
    prot: 0.6,
    grasa: 0.2,
    cal: 96,
    necesario: 1 //indica si es necesario en la dieta o no
},
{
    title:"Un Durazno mediano",
    text: "38 calorias, 0.9g de prots, 9g de carb y 0.3g de grasas",
    image: require("../images/nutricion/peach.png"),
    carb: 9.38,
    prot: 0.89,
    grasa: 0.3,
    cal: 38,
    necesario: 1 //indica si es necesario en la dieta o no
},
{
    title:"Un Tomate mediano",
    text: "22 calorias, 1g de prots, 5g de carb y 0.2g de grasas",
    image: require("../images/nutricion/tomato.png"),
    carb: 4.82,
    prot: 1.08,
    grasa: 0.25,
    cal: 22,
    necesario: 1 //indica si es necesario en la dieta o no
},
//verduras necesario = 2, pos = 15 , term = 18
{
    title:"100g de Lechuga",
    text: "14 calorias, 1g de prots, 3g de carb y 0.14g de grasas",
    image: require("../images/nutricion/lettuce.png"),
    carb: 3,
    prot: 1,
    grasa: 0.14,
    cal: 14,
    necesario: 1 //indica si es necesario en la dieta o no
}
,

{
    title:"100g de Apio",
    text: "14 calorias, 0.7g de prots, 3g de carb y 0.17g de grasas",
    image: require("../images/nutricion/celery.png"),
    carb: 3,
    prot: 0.7,
    grasa: 0.17,
    cal: 14,
    necesario: 2 //indica si es necesario en la dieta o no
}
,
{
    title:"100g de Brócoli",
    text: "34 calorias, 3g de prots, 7g de carb y 0.4g de grasas",
    image: require("../images/nutricion/broccoli.png"),
    carb: 7,
    prot: 3,
    grasa: 0.4,
    cal: 34,
    necesario: 2 //indica si es necesario en la dieta o no 
}
,
{
    title:"100g de Papas",
    text: "104 calorias, 2g de prots, 19g de carb y 2g de grasas",
    image: require("../images/nutricion/potato.png"),
    carb: 19.4,
    prot: 1.7,
    grasa: 2.4,
    cal: 104,
    necesario: 2 //indica si es necesario en la dieta o no
},
{
    title:"30g de Aceite de Oliva",
    text: "251 calorias, 0g de prots, 0g de carb y 28g de grasas",
    image: require("../images/nutricion/aceite.png"),
    carb: 0,
    prot: 0,
    grasa: 28,
    cal: 251,
    necesario: 0 //indica si es necesario en la dieta o no
},
]