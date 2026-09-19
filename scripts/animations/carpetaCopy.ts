/** Light theme tokens of the Carpeta Ciudadana site (src/styles/tokens.css
 * there), so the videos sit next to its published diagrams without looking
 * like a different project. */
export const cc = {
  canvas: "#f6f5f4",
  surface: "#ffffff",
  hairline: "#e6e6e6",
  ink: "#000000",
  muted: "#615d59",
  faint: "#96928c",
  faintText: "#74706c",
  primary: "#0075de",
  primaryText: "#005bab",
  orange: "#b84c00",
  sut: "#31302e",
};

export type Lang = "en" | "es";
export type CarpetaId = "transfer" | "states" | "register" | "upload";

/** sut: the system being built. box: another system, drawn solid as the SRS
 * does. ext: outside the operator, drawn dashed as the architecture does. */
export type Kind = "sut" | "box" | "ext" | "person";
export type Head = { name: string; sub: string; kind: Kind };
/** from and to are lifeline indexes; step is the animation step that reveals it. */
export type Msg = { from: number; to: number; step: number; label: string; op?: string; accent?: boolean };
export type Legend = [Kind | "m" | "a" | "dot", string][];

type Frame = { tag: string; title: string; brand: string; intro: string; steps: string[]; outro: string };
export type Seq = Frame & { kind: "seq"; heads: Head[]; msgs: Msg[]; zone?: { col: number; label: string }; legend: Legend };
export type States = Frame & {
  kind: "states";
  zones: [string, string];
  /** name and subtitle of each state, in drawing order */
  received: [string, string];
  verified: [string, string];
  active: [string, string];
  rejected: [string, string];
  retired: [string, string];
  uploaded: [string, string];
  superseded: [string, string];
  deleted: [string, string];
  valid: string[];
  complete: string[];
  invalid: string[];
  order: string[];
  arrives: string[];
  traced: string[];
  retention: string[];
  legend: Legend;
};

export const stepOf = { en: (n: number, of: number) => `Step ${n} of ${of}`, es: (n: number, of: number) => `Paso ${n} de ${of}` };

// SRS *4.1. The Spanish is the published diagram's own text.
const transfer: Record<Lang, Seq> = {
  en: {
    kind: "seq",
    tag: "SRS 4.1",
    title: "Transfer between operators",
    brand: "Carpeta Ciudadana",
    intro: "An entity issues a document for a citizen who belongs to another operator.",
    steps: [
      "1 · The entity hands its operator the signed document and the recipient's ID number.",
      "2 · The sending operator asks the centralizer which operator holds that ID number.",
      "3 · The document travels straight to the receiving operator, which confirms with an idempotent ack.",
      "4 · The receiving operator notifies the citizen by email and SMS.",
      "5 · The citizen opens and downloads the document with its signature intact.",
    ],
    outro: "Between step 2 and step 3 the centralizer drops out. It never touches the document.",
    heads: [
      { name: "Issuing entity", sub: "MEN · notary · embassy", kind: "box" },
      { name: "Sending operator", sub: "OUR SYSTEM", kind: "sut" },
      { name: "Centralizer", sub: "MinTIC · GovCarpeta", kind: "box" },
      { name: "Receiving operator", sub: "another peer in the federation", kind: "box" },
      { name: "Recipient citizen", sub: "", kind: "person" },
    ],
    msgs: [
      { from: 0, to: 1, step: 1, label: "SIGNED DOCUMENT · ID NUMBER" },
      { from: 1, to: 2, step: 2, label: "RECIPIENT'S ID NUMBER" },
      { from: 2, to: 1, step: 2, label: "RECEIVING OPERATOR · URL" },
      { from: 1, to: 3, step: 3, label: "DOCUMENTS · METADATA · SIGNATURE", accent: true },
      { from: 3, to: 1, step: 3, label: "IDEMPOTENT ACK", accent: true },
      { from: 3, to: 4, step: 4, label: "EMAIL AND SMS NOTICE" },
      { from: 4, to: 3, step: 5, label: "AUTHENTICATED REQUEST" },
      { from: 3, to: 4, step: 5, label: "DOCUMENT WITH ITS SIGNATURE" },
    ],
    zone: { col: 1, label: "OUR OPERATOR" },
    legend: [["m", "Identifiers and notices"], ["a", "Document content, never through the centralizer"], ["sut", "Our operator"]],
  },
  es: {
    kind: "seq",
    tag: "SRS 4.1",
    title: "Transferencia entre operadores",
    brand: "Carpeta Ciudadana",
    intro: "Una entidad emite un documento para un ciudadano afiliado a otro operador.",
    steps: [
      "1 · La entidad entrega a su operador el documento firmado y la cédula del destinatario.",
      "2 · El operador emisor pregunta al centralizador ante qué operador está esa cédula.",
      "3 · El documento viaja directo al operador destino, que confirma con acuse idempotente.",
      "4 · El operador destino avisa al ciudadano por correo y SMS.",
      "5 · El ciudadano consulta y descarga el documento con su firma intacta.",
    ],
    outro: "Entre el paso 2 y el paso 3 el centralizador desaparece. Nunca toca el documento.",
    heads: [
      { name: "Entidad emisora", sub: "MEN · notaría · embajada", kind: "box" },
      { name: "Operador emisor", sub: "NUESTRO SISTEMA", kind: "sut" },
      { name: "Centralizador", sub: "MinTIC · GovCarpeta", kind: "box" },
      { name: "Operador destino", sub: "otro par de la federación", kind: "box" },
      { name: "Ciudadano destinatario", sub: "", kind: "person" },
    ],
    msgs: [
      { from: 0, to: 1, step: 1, label: "DOCUMENTO FIRMADO · CÉDULA" },
      { from: 1, to: 2, step: 2, label: "CÉDULA DEL DESTINATARIO" },
      { from: 2, to: 1, step: 2, label: "OPERADOR DESTINO · URL" },
      { from: 1, to: 3, step: 3, label: "DOCUMENTOS · METADATOS · FIRMA", accent: true },
      { from: 3, to: 1, step: 3, label: "ACUSE IDEMPOTENTE", accent: true },
      { from: 3, to: 4, step: 4, label: "AVISO POR CORREO Y SMS" },
      { from: 4, to: 3, step: 5, label: "CONSULTA AUTENTICADA" },
      { from: 3, to: 4, step: 5, label: "DOCUMENTO CON SU FIRMA" },
    ],
    zone: { col: 1, label: "NUESTRO OPERADOR" },
    legend: [["m", "Identificadores y avisos"], ["a", "Contenido documental, nunca pasa por el centralizador"], ["sut", "Nuestro operador"]],
  },
};

// SRS *4.2
const states: Record<Lang, States> = {
  en: {
    kind: "states",
    tag: "SRS 4.2",
    title: "Life cycle of a document",
    brand: "Carpeta Ciudadana",
    intro: "A document enters the folder by one of two paths, and the path decides its rights.",
    steps: [
      "1 · The certificate enters as received and its signature is checked.",
      "2 · With complete metadata it becomes active: immutable and kept forever.",
      "3 · If the signature is invalid it is rejected and never enters the folder.",
      "4 · A temporary document uses quota, and the holder can delete it any time.",
      "5 · When the signed version arrives the two stay linked. Only retention retires an active one.",
    ],
    outro: "The top row has no transition that depends on what the citizen wants. The bottom row has almost nothing else.",
    zones: ["CERTIFIED · ISSUED AND SIGNED BY AN ENTITY", "TEMPORARY · UPLOADED BY THE CITIZEN"],
    received: ["Received", "signature to check"],
    verified: ["Verified", "hash and signature recorded"],
    active: ["Active", "KEPT FOREVER · IMMUTABLE"],
    rejected: ["Rejected", "never enters the folder"],
    retired: ["Retired", "never on the holder's order"],
    uploaded: ["Uploaded", "uses quota"],
    superseded: ["Superseded", "linked to the signed one"],
    deleted: ["Deleted", "frees quota"],
    valid: ["SIGNATURE OK"],
    complete: ["COMPLETE", "METADATA"],
    invalid: ["INVALID SIGNATURE"],
    order: ["HOLDER'S ORDER"],
    arrives: ["SIGNED ONE", "ARRIVES"],
    traced: ["TRACE KEPT"],
    retention: ["RETENTION POLICY"],
    legend: [["dot", "Entry"], ["box", "State"], ["sut", "Kept forever"], ["a", "Transition that fixes retention forever"]],
  },
  es: {
    kind: "states",
    tag: "SRS 4.2",
    title: "Ciclo de vida de un documento",
    brand: "Carpeta Ciudadana",
    intro: "Un documento entra a la carpeta por uno de dos caminos, y el camino decide sus derechos.",
    steps: [
      "1 · El certificado entra como recibido y se verifica su firma.",
      "2 · Con metadatos completos pasa a vigente: inmutable y a perpetuidad.",
      "3 · Si la firma no es válida queda rechazado y no entra a la carpeta.",
      "4 · El temporal consume cuota y el titular puede eliminarlo cuando quiera.",
      "5 · Al llegar la versión firmada queda enlazada. Solo la retención retira un vigente.",
    ],
    outro: "La fila de arriba no tiene ninguna transición que dependa de la voluntad del ciudadano, y la de abajo casi solo tiene de esas.",
    zones: ["CERTIFICADO · LO EMITE Y FIRMA UNA ENTIDAD", "TEMPORAL · LO SUBE EL PROPIO CIUDADANO"],
    received: ["Recibido", "firma por verificar"],
    verified: ["Verificado", "hash y firma registrados"],
    active: ["Vigente", "A PERPETUIDAD · INMUTABLE"],
    rejected: ["Rechazado", "no ingresa a la carpeta"],
    retired: ["Retirado", "nunca por orden del titular"],
    uploaded: ["Cargado", "consume cuota"],
    superseded: ["Sustituido", "enlazado a la firmada"],
    deleted: ["Eliminado", "libera cuota"],
    valid: ["FIRMA VÁLIDA"],
    complete: ["METADATOS", "COMPLETOS"],
    invalid: ["FIRMA INVÁLIDA"],
    order: ["ORDEN DEL TITULAR"],
    arrives: ["LLEGA LA", "FIRMADA"],
    traced: ["QUEDA TRAZADA"],
    retention: ["POLÍTICA DE RETENCIÓN"],
    legend: [["dot", "Entrada"], ["box", "Estado"], ["sut", "Custodia perpetua"], ["a", "Transición que fija la retención a perpetuidad"]],
  },
};

// Architecture *4.1 (HU-01). Endpoints and function names stay as the code has them.
const register: Record<Lang, Seq> = {
  en: {
    kind: "seq",
    tag: "US-01",
    title: "Registration and affiliation",
    brand: "Mi Carpeta Segura",
    intro: "A single affiliation needs strong consistency with the centralizer. So the user is born disabled, and enabled only once GovCarpeta confirms.",
    steps: [
      "1 · The portal sends the data and Affiliation simulates the identity check.",
      "2 · The gateway asks GovCarpeta and turns its 204 into \"free\".",
      "3 · Affiliation creates the user in Keycloak, disabled.",
      "4 · GovCarpeta registers the citizen with the minimum data.",
      "5 · Affiliation enables the user and returns the institutional account.",
    ],
    outro: "If GovCarpeta refuses, Affiliation deletes the user: no account is left without an affiliation.",
    heads: [
      { name: "Portal", sub: "citizen", kind: "ext" },
      { name: "Affiliation", sub: "MS-03", kind: "box" },
      { name: "Keycloak", sub: "MS-01", kind: "box" },
      { name: "Gateway", sub: "MS-08", kind: "box" },
      { name: "GovCarpeta", sub: "centralizer", kind: "ext" },
    ],
    msgs: [
      { from: 0, to: 1, step: 1, label: "REGISTRATION DATA", op: "POST /ciudadanos" },
      { from: 1, to: 1, step: 1, label: "SIMULATED IDENTITY", op: "verificarIdentidad()" },
      { from: 1, to: 3, step: 2, label: "ID NUMBER", op: "GET /centralizador/ciudadanos/{id}" },
      { from: 3, to: 4, step: 2, label: "ID NUMBER", op: "GET /apis/validateCitizen/{id}" },
      { from: 4, to: 3, step: 2, label: "NO OPERATOR", op: "204 No Content" },
      { from: 3, to: 1, step: 2, label: "CITIZEN IS FREE", op: "200 {afiliado:false}" },
      { from: 1, to: 2, step: 3, label: "DISABLED USER", op: "POST /admin/realms/carpeta/users" },
      { from: 1, to: 3, step: 4, label: "MINIMUM DATA", op: "POST /centralizador/ciudadanos", accent: true },
      { from: 3, to: 4, step: 4, label: "ID · NAME · EMAIL · OPERATOR", op: "POST /apis/registerCitizen", accent: true },
      { from: 4, to: 3, step: 4, label: "REGISTRATION CONFIRMED", op: "201 Created" },
      { from: 1, to: 2, step: 5, label: "ENABLED USER", op: "PUT /admin/realms/carpeta/users/{id}" },
      { from: 1, to: 0, step: 5, label: "INSTITUTIONAL ACCOUNT", op: "201 Created" },
    ],
    legend: [["m", "Message"], ["a", "Critical path"], ["ext", "Outside the operator"]],
  },
  es: {
    kind: "seq",
    tag: "HU-01",
    title: "Registro y afiliación",
    brand: "Mi Carpeta Segura",
    intro: "La afiliación única exige consistencia fuerte con el centralizador. Por eso el usuario nace deshabilitado y solo se habilita cuando GovCarpeta confirma.",
    steps: [
      "1 · El portal envía los datos y Afiliación simula la verificación de identidad.",
      "2 · La pasarela pregunta a GovCarpeta y traduce el 204 a «libre».",
      "3 · Afiliación crea el usuario deshabilitado en Keycloak.",
      "4 · GovCarpeta registra al ciudadano con el mínimo de datos.",
      "5 · Afiliación habilita el usuario y devuelve la cuenta institucional.",
    ],
    outro: "Si GovCarpeta rechaza el alta, Afiliación borra el usuario: no queda una cuenta sin afiliación.",
    heads: [
      { name: "Portal", sub: "ciudadano", kind: "ext" },
      { name: "Afiliación", sub: "MS-03", kind: "box" },
      { name: "Keycloak", sub: "MS-01", kind: "box" },
      { name: "Pasarela", sub: "MS-08", kind: "box" },
      { name: "GovCarpeta", sub: "centralizador", kind: "ext" },
    ],
    msgs: [
      { from: 0, to: 1, step: 1, label: "DATOS DE REGISTRO", op: "POST /ciudadanos" },
      { from: 1, to: 1, step: 1, label: "IDENTIDAD SIMULADA", op: "verificarIdentidad()" },
      { from: 1, to: 3, step: 2, label: "CÉDULA", op: "GET /centralizador/ciudadanos/{id}" },
      { from: 3, to: 4, step: 2, label: "CÉDULA", op: "GET /apis/validateCitizen/{id}" },
      { from: 4, to: 3, step: 2, label: "SIN OPERADOR", op: "204 No Content" },
      { from: 3, to: 1, step: 2, label: "CIUDADANO LIBRE", op: "200 {afiliado:false}" },
      { from: 1, to: 2, step: 3, label: "USUARIO DESHABILITADO", op: "POST /admin/realms/carpeta/users" },
      { from: 1, to: 3, step: 4, label: "DATOS MÍNIMOS", op: "POST /centralizador/ciudadanos", accent: true },
      { from: 3, to: 4, step: 4, label: "ID · NOMBRE · CORREO · OPERADOR", op: "POST /apis/registerCitizen", accent: true },
      { from: 4, to: 3, step: 4, label: "ALTA CONFIRMADA", op: "201 Created" },
      { from: 1, to: 2, step: 5, label: "USUARIO HABILITADO", op: "PUT /admin/realms/carpeta/users/{id}" },
      { from: 1, to: 0, step: 5, label: "CUENTA INSTITUCIONAL", op: "201 Created" },
    ],
    legend: [["m", "Mensaje"], ["a", "Tramo crítico"], ["ext", "Fuera del operador"]],
  },
};

// Architecture *4.3 (HU-03)
const upload: Record<Lang, Seq> = {
  en: {
    kind: "seq",
    tag: "US-03",
    title: "Uploading a temporary document",
    brand: "Mi Carpeta Segura",
    intro: "Custody authorizes the upload but doesn't carry it. The browser writes straight to storage with a URL that expires in 5 minutes.",
    steps: [
      "1 · Custody checks type, size and quota, and records the document as pending.",
      "2 · Custody signs a PUT URL valid for 5 minutes, without calling storage.",
      "3 · The browser uploads the binary straight to storage.",
      "4 · Custody checks the uploaded object and computes its SHA-256.",
      "5 · The document is uploaded.",
    ],
    outro: "The service never holds the binary in memory: it scales with requests, not megabytes.",
    heads: [
      { name: "Portal", sub: "SPA", kind: "ext" },
      { name: "Custody", sub: "MS-04", kind: "box" },
      { name: "PostgreSQL", sub: "custody database", kind: "box" },
      { name: "S3 store", sub: "MinIO · GCS", kind: "box" },
    ],
    msgs: [
      { from: 0, to: 1, step: 1, label: "TITLE · TYPE · SIZE", op: "POST /documentos" },
      { from: 1, to: 2, step: 1, label: "PENDING DOCUMENT", op: "INSERT after the quota check" },
      { from: 1, to: 1, step: 2, label: "PUT URL · 5 MIN", op: "getSignedUrl()" },
      { from: 1, to: 0, step: 2, label: "ID · UPLOAD URL", op: "201 Created" },
      { from: 0, to: 3, step: 3, label: "PDF · JPG · PNG BINARY", op: "PUT urlCarga", accent: true },
      { from: 3, to: 0, step: 3, label: "ETAG", op: "200 OK" },
      { from: 0, to: 1, step: 4, label: "DOCUMENT ID", op: "POST /documentos/{id}/confirmacion" },
      { from: 1, to: 3, step: 4, label: "SIZE · TYPE · BYTES", op: "HeadObject · GetObject" },
      { from: 1, to: 2, step: 5, label: "UPLOADED · SHA-256", op: "UPDATE documento" },
      { from: 1, to: 0, step: 5, label: "DOCUMENT UPLOADED", op: "200 JSON" },
    ],
    legend: [["m", "Message"], ["a", "Critical path"], ["ext", "Outside the operator"]],
  },
  es: {
    kind: "seq",
    tag: "HU-03",
    title: "Carga de documento temporal",
    brand: "Mi Carpeta Segura",
    intro: "Custodia autoriza la subida pero no la transporta. El navegador escribe directo en el almacén con una URL que caduca en 5 minutos.",
    steps: [
      "1 · Custodia valida tipo, tamaño y cuota y registra el documento pendiente.",
      "2 · Custodia firma una URL PUT de 5 minutos, sin llamar al almacén.",
      "3 · El navegador sube el binario directo al almacén.",
      "4 · Custodia comprueba el objeto subido y calcula su SHA-256.",
      "5 · El documento queda cargado.",
    ],
    outro: "El servicio nunca carga el binario en memoria: escala por peticiones, no por megas.",
    heads: [
      { name: "Portal", sub: "SPA", kind: "ext" },
      { name: "Custodia", sub: "MS-04", kind: "box" },
      { name: "PostgreSQL", sub: "base custodia", kind: "box" },
      { name: "Almacén S3", sub: "MinIO · GCS", kind: "box" },
    ],
    msgs: [
      { from: 0, to: 1, step: 1, label: "TÍTULO · TIPO · TAMAÑO", op: "POST /documentos" },
      { from: 1, to: 2, step: 1, label: "DOCUMENTO PENDIENTE", op: "INSERT tras validar cuota" },
      { from: 1, to: 1, step: 2, label: "URL PUT 5 MIN", op: "getSignedUrl()" },
      { from: 1, to: 0, step: 2, label: "ID · URL DE CARGA", op: "201 Created" },
      { from: 0, to: 3, step: 3, label: "BINARIO PDF · JPG · PNG", op: "PUT urlCarga", accent: true },
      { from: 3, to: 0, step: 3, label: "ETAG", op: "200 OK" },
      { from: 0, to: 1, step: 4, label: "ID DEL DOCUMENTO", op: "POST /documentos/{id}/confirmacion" },
      { from: 1, to: 3, step: 4, label: "TAMAÑO · TIPO · BYTES", op: "HeadObject · GetObject" },
      { from: 1, to: 2, step: 5, label: "CARGADO · SHA-256", op: "UPDATE documento" },
      { from: 1, to: 0, step: 5, label: "DOCUMENTO CARGADO", op: "200 JSON" },
    ],
    legend: [["m", "Mensaje"], ["a", "Tramo crítico"], ["ext", "Fuera del operador"]],
  },
};

export const carpeta: Record<CarpetaId, Record<Lang, Seq | States>> = { transfer, states, register, upload };
