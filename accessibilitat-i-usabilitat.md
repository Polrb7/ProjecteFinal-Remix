# Avaluació d'Accessibilitat i Usabilitat en el Desenvolupament Web  
**Pol Romeu Busquets**  

L'accessibilitat i la usabilitat són dos pilars fonamentals del disseny web. Assegurar que una aplicació sigui accessible significa garantir que totes les persones, incloent-hi aquelles amb discapacitats, puguin accedir-hi i fer-la servir fàcilment. Per altra banda, la usabilitat permet que l'experiència de l'usuari sigui intuïtiva i satisfactòria.  
En aquest exercici, avaluareu l'accessibilitat i la usabilitat de la vostra aplicació web desenvolupada amb Remix, identificant possibles millores i proposant canvis basats en proves amb usuaris.  

---

## 1. Preparació  

### Tasques a Provar:  
1. Definiu 3 accions bàsiques que un usuari hauria de poder realitzar a l'aplicació:  
   - Navegar per l’aplicació (registrar-se, veure tots els llibres, donar like a un llibre, afegir una review i afegir un comentari a la seva review).  
   - Afegir un llibre.  
   - Registrar-se, després entrar com a admin i fer que el seu usuari passi a ser admin.  

---

## 2. Realització de Proves amb Usuaris  

### Selecció d'Usuaris:  
Trieu 3 persones que no estiguin familiaritzades amb l'aplicació:  
- **David (pare, 52 anys):** Té una mica d'experiència, però encara desconeix algunes coses. Tot i així, crec que li serà fàcil realitzar la tasca que li toqui.  
- **Carme (iaia, 74 anys):** No té experiència en aquest àmbit. No sabrà ni fer anar el ratolí, però la guiaré.  
- **Genís (cosí, 12 anys):** Té una mica d'experiència, però no sé exactament quanta. Segurament en tindrà força.  

### Execució de les Proves:  
Demaneu als usuaris que completin les tasques definides mentre observeu:  

#### 1. Quant de temps triguen:  
- **David:** Ha tardat poc (5 mins).  
- **Carme:** Ha tardat poc, ja que només es tractava d'afegir un llibre (3-5 mins).  
- **Genís:** Ha tardat una mica més que la Carme perquè era una tasca més llarga (5 mins).  

#### 2. Dificultats o errors que experimenten:  
- **David:** Cap dificultat, excepte el mateix que amb el login i register, però per la resta tot correcte.  
- **Carme:** La gran dificultat que ha trobat és que no entén anglès i la pàgina està en anglès. Per la resta, molt bé.  
- **Genís:** Ha trobat que, al fer login o register, s’ha de canviar la URL de navegació a `index`, ja que no es fa la redirecció correctament.  

#### 3. Reaccions verbals o no verbals (e.g., confusió, frustració):  
- **David:** Tot bé.  
- **Carme:** Tot correcte en aquest aspecte.  
- **Genís:** Tot bé.  

---

## 3. Anàlisi i Proposta de Millores  

### Resum dels Resultats:  

#### Observacions durant les proves:  
- **David:** Ha anat bé, ho ha trobat tot bastant accessible.  
- **Carme:** Ha anat bastant bé. S’ha embolicat una mica amb el teclat i el ratolí, però, pel que fa a l’aplicació, molt bé.  
- **Genís:** Ha anat molt bé. L’he hagut d’ajudar a l’hora d’entrar com a admin (ja hi comptava), però per la resta se n’ha sortit molt bé.  

#### Problemes identificats (amb prioritat alta, mitjana o baixa):  
- **David:** La redirecció a l’hora de fer login i/o register.  
- **Carme:** En la tasca que ha desenvolupat, cap problema.  
- **Genís:** La redirecció a l’hora de fer login i/o register.  

#### Feedback recollit dels usuaris:  
- **David:** Està molt bé, però li agradaria que, per veure els detalls del llibre, es pogués fer clic a la targeta en comptes d’al botó "View Details".  
- **Carme:** Si entengués l'anglès, podria fer-ho sense cap problema, ja que era fàcil fer el que se li demanava.  
- **Genís:** M’ha dit que tot era bastant accessible i que es podia realitzar tot fàcilment.  

---

### Propostes de Millora:  
Basant-vos en els resultats, proposeu canvis específics per millorar:  

#### Accessibilitat:  
- Traduir l'aplicació a diferents idiomes (e.g., català o espanyol).  

#### Usabilitat:  
- Permetre fer clic a la targeta del llibre per mostrar els detalls.  
