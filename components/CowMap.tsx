"use client";

import { useState } from "react";
import { translate, translateCorte } from "../lib/i18n";
import type { Corte, Zona } from "../lib/types";
import { useLocale } from "./LocaleProvider";

type Shape = {
  slug: string;
  path: string;
  x: number;
  y: number;
  leg?: "delantera" | "trasera";
  head?: boolean;
};

const shapes: Shape[] = [
  { slug: "cogote", path: "M 224 173 C 259 144 296 137 344 140 L 340 253 C 339 287 334 322 338 361 Q 312 363 286 380 L 256 336 C 235 311 217 275 214 236 Q 211 196 224 173 Z", x: 280, y: 230 },
  { slug: "paleta", path: "M 344 140 C 374 139 399 143 421 149 C 435 201 447 262 451 319 C 455 361 451 394 432 423 Q 401 411 376 415 Q 353 405 338 388 C 330 349 333 298 340 253 Z", x: 389, y: 281 },
  { slug: "aguja", path: "M 421 149 Q 443 147 462 151 L 462 243 L 451 319 C 447 262 435 201 421 149 Z", x: 445, y: 228 },
  { slug: "brazuelo", path: "M 337 378 Q 360 393 379 408 L 375 478 Q 371 480 362 484 L 326 484 Q 315 481 310 477 L 302 430 Q 312 400 337 378 Z", x: 340, y: 444, leg: "delantera" },
  { slug: "garron", path: "M 310 477 Q 328 484 375 478 L 369 529 Q 363 541 350 548 L 321 548 Q 316 538 309 528 Z", x: 341, y: 515, leg: "delantera" },
  { slug: "osobuco", path: "M 321 548 Q 343 555 372 545 L 365 579 Q 354 593 323 587 Z", x: 344, y: 570, leg: "delantera" },
  { slug: "tapa-de-asado", path: "M 462 151 C 484 151 501 156 521 162 L 547 266 Q 512 276 482 272 L 462 243 Z", x: 512, y: 211 },
  { slug: "costilla", path: "M 465 271 Q 505 279 547 266 L 564 359 Q 521 376 464 365 C 470 334 469 302 465 271 Z", x: 515, y: 324 },
  { slug: "asado-de-tira", path: "M 464 365 Q 521 376 564 359 L 578 424 Q 521 439 452 427 Q 463 402 464 365 Z", x: 515, y: 399 },
  { slug: "bife-de-chorizo", path: "M 521 162 C 565 171 604 176 646 176 L 657 266 Q 604 272 547 266 Z", x: 589, y: 211 },
  { slug: "bife-ancho", path: "M 646 176 Q 670 176 694 174 L 716 267 Q 686 274 657 266 Z", x: 682, y: 216 },
  { slug: "bife-angosto", path: "M 694 174 C 730 171 762 164 794 157 L 819 258 Q 766 274 716 267 Z", x: 760, y: 211 },
  { slug: "lomo", path: "M 657 266 Q 686 274 716 267 Q 766 274 819 258 L 841 322 Q 783 345 718 340 Q 681 336 660 350 L 645 329 Z", x: 744, y: 307 },
  { slug: "vacio", path: "M 564 359 Q 604 350 645 329 L 660 350 Q 681 336 718 340 Q 783 345 841 322 L 868 393 Q 849 415 819 423 Q 742 433 660 423 L 578 424 Z", x: 730, y: 385 },
  { slug: "entrana", path: "M 547 266 Q 604 272 657 266 L 645 329 Q 605 352 564 359 Z", x: 601, y: 317 },
  { slug: "matambre", path: "M 452 427 Q 521 439 578 424 L 660 423 Q 742 433 819 423 Q 800 451 770 465 Q 685 478 588 464 L 492 453 Q 464 449 443 438 Z", x: 627, y: 450 },
  { slug: "falda", path: "M 379 408 Q 411 411 446 423 Q 464 449 492 453 L 588 464 Q 554 480 501 475 L 412 461 Q 383 452 371 430 Z", x: 477, y: 456 },
  { slug: "tapa-de-nalga", path: "M 819 153 Q 865 136 918 119 Q 941 162 956 210 Q 910 216 865 232 L 819 258 Z", x: 881, y: 182 },
  { slug: "nalga", path: "M 918 119 Q 979 99 1032 104 Q 1083 113 1114 153 Q 1138 186 1141 223 Q 1086 210 1030 212 Q 993 207 956 210 Q 941 162 918 119 Z", x: 1040, y: 166 },
  { slug: "cuadril", path: "M 956 210 Q 993 207 1030 212 Q 1086 210 1141 223 Q 1151 259 1143 300 Q 1120 296 1094 297 Q 1033 288 984 302 Q 938 309 902 339 Q 880 312 865 232 Q 910 216 956 210 Z", x: 1011, y: 260 },
  { slug: "colita-de-cuadril", path: "M 841 322 L 865 232 Q 880 312 902 339 Q 915 364 938 390 Q 911 409 875 402 L 868 393 Z", x: 880, y: 352 },
  { slug: "bola-de-lomo", path: "M 902 339 Q 938 309 984 302 Q 1033 288 1094 297 Q 1118 333 1110 371 Q 1101 412 1078 438 Q 1030 455 979 440 Q 949 426 938 390 Q 915 364 902 339 Z", x: 1020, y: 365 },
  { slug: "peceto", path: "M 875 402 Q 911 409 938 390 L 966 443 Q 975 461 1014 464 Q 988 478 966 479 Q 937 491 908 475 Q 882 450 868 423 Z", x: 927, y: 447 },
  { slug: "garron-trasero", path: "M 968 458 Q 1018 478 1078 438 Q 1087 481 1080 525 L 1093 574 L 1062 593 Q 1043 565 1034 528 L 1011 483 L 979 479 Z", x: 1040, y: 530, leg: "trasera" },
  { slug: "lengua", path: "M 57 277 Q 77 265 97 275 Q 100 289 86 297 L 65 299 Z", x: 78, y: 287, head: true },
  { slug: "cola", path: "M 1152 198 Q 1182 205 1183 235 L 1171 320 Q 1163 360 1182 391 L 1176 401 Q 1155 382 1156 348 L 1168 260 Q 1171 224 1150 212 Z", x: 1168, y: 344, head: true }
];

const zoneLabels: Array<{ key: Zona; message: "legendFront" | "legendMiddle" | "legendRear" | "legendSide" | "legendOther" }> = [
  { key: "delantera", message: "legendFront" },
  { key: "media", message: "legendMiddle" },
  { key: "trasera", message: "legendRear" },
  { key: "costado", message: "legendSide" },
  { key: "cabeza", message: "legendOther" }
];

function wrapLabel(name: string): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of name.split(" ")) {
    if (current && `${current} ${word}`.length > 9) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

type CowMapProps = {
  cortes: Corte[];
  selectedSlug: string | null;
  highlightedSlug: string | null;
  onSelect: (slug: string) => void;
};

export function CowMap({ cortes, selectedSlug, highlightedSlug, onSelect }: CowMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const { locale } = useLocale();
  const cortesBySlug = new Map(cortes.map((corte) => [corte.slug, translateCorte(corte, locale)]));
  const activeShape = shapes.find(({ slug }) => slug === hovered);
  const activeCorte = activeShape ? cortesBySlug.get(activeShape.slug) : undefined;
  const selectedCorte = selectedSlug ? cortesBySlug.get(selectedSlug) : undefined;

  function renderLabel(shape: Shape) {
    const corte = cortesBySlug.get(shape.slug);
    if (!corte) return null;
    const labelLines = wrapLabel(corte.nombre);
    return (
      <text
        key={`label-${corte.slug}`}
        className="region-label"
        data-slug={shape.slug}
        x={shape.x}
        y={shape.y}
        aria-hidden="true"
        textAnchor="middle"
        dominantBaseline="middle"
        onClick={() => onSelect(shape.slug)}
      >
        {labelLines.map((line, index) => (
          <tspan key={line} x={shape.x} dy={index === 0 ? `${-(labelLines.length - 1) * 8}px` : "16px"}>{line}</tspan>
        ))}
      </text>
    );
  }

  function renderRegion(shape: Shape) {
    const corte = cortesBySlug.get(shape.slug);
    if (!corte) return null;
    const isSelected = selectedSlug === corte.slug;
    const isHighlighted = highlightedSlug === corte.slug;
    return (
      <g
        key={corte.slug}
        className={`map-region zone-${corte.zona}${isSelected ? " is-selected" : ""}${isHighlighted ? " is-highlighted" : ""}`}
        onClick={() => onSelect(corte.slug)}
        onMouseEnter={() => setHovered(corte.slug)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(corte.slug)}
        onBlur={() => setHovered(null)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(corte.slug);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${corte.nombre}, ${translate(locale, "zoneIndicator")} ${translate(locale, zoneLabels.find(({ key }) => key === corte.zona)?.message ?? "legendOther")}`}
        aria-pressed={isSelected}
        data-slug={corte.slug}
      >
        <path id={corte.svg_id} d={shape.path} className="region-shape" />
        <path d={shape.path} className="region-hit-area" aria-hidden="true" />
      </g>
    );
  }

  return (
    <div className="map-frame">
      <div className="map-svg-wrap">
        {selectedCorte && <span className="map-selected-chip" aria-live="polite">{selectedCorte.nombre}</span>}
        <svg className="cow-map" viewBox="0 0 1200 720" role="group" aria-label={translate(locale, "cowMapAria")} preserveAspectRatio="xMidYMid meet">
          <defs>
            <clipPath id="cow-body-clip">
              <path d="M 213 171 C 236 139 287 127 343 139 C 397 140 441 150 489 158 C 547 169 600 177 651 176 C 704 176 753 169 802 157 C 856 143 905 125 954 108 C 1009 90 1060 100 1099 126 C 1137 151 1155 189 1159 235 C 1165 291 1152 350 1127 397 C 1106 436 1070 458 1027 466 C 975 476 922 459 869 449 C 802 437 744 452 680 459 C 610 466 553 458 495 465 C 447 466 411 449 376 432 C 341 417 311 400 286 365 C 258 330 229 294 216 250 C 205 218 201 190 213 171 Z" />
            </clipPath>
            <clipPath id="cow-front-leg-clip">
              <path d="M 306 365 Q 333 368 358 398 L 365 474 Q 360 508 369 546 L 357 597 Q 347 622 351 656 L 335 680 L 288 680 Q 284 674 291 663 L 316 641 Q 322 611 319 586 L 301 530 L 294 447 Z" />
            </clipPath>
            <clipPath id="cow-hind-leg-clip">
              <path d="M 986 414 Q 1012 416 1037 442 L 1044 497 Q 1042 529 1057 563 L 1062 618 Q 1055 648 1070 672 L 1053 692 L 1015 690 L 1024 663 Q 1026 636 1016 611 L 995 562 Q 981 529 984 494 L 963 450 Z" />
            </clipPath>
          </defs>
          <g className="cow-far-legs">
            <path d="M 428 381 Q 455 393 473 421 L 466 499 Q 474 533 467 573 L 450 632 L 425 630 L 433 573 Q 433 540 422 508 L 411 432 Z" />
            <path d="M 1026 396 Q 1053 400 1070 427 L 1064 489 Q 1077 527 1070 567 L 1083 627 L 1056 632 L 1037 573 Q 1025 540 1028 503 L 1007 440 Z" />
          </g>
          <path className="cow-tail" d="M 1096 129 Q 1141 137 1167 177 Q 1187 211 1177 267 L 1167 350 Q 1163 389 1185 415 Q 1191 425 1182 433 Q 1158 417 1152 384 Q 1145 353 1151 306 L 1162 239 Q 1164 192 1131 160 Z" />
          <g className="cow-legs">
            <path d="M 306 365 Q 333 368 358 398 L 365 474 Q 360 508 369 546 L 357 597 Q 347 622 351 656 L 335 680 L 288 680 Q 284 674 291 663 L 316 641 Q 322 611 319 586 L 301 530 L 294 447 Z" />
            <path d="M 346 381 Q 370 389 392 418 L 391 489 Q 386 521 395 556 L 384 611 Q 374 637 380 665 L 363 685 L 328 682 L 340 652 Q 344 622 341 598 L 329 544 L 322 473 Z" />
            <path d="M 927 414 Q 950 415 974 440 L 989 490 Q 990 527 1004 559 L 1011 615 Q 1005 643 1018 668 L 1003 690 L 959 689 Q 950 682 960 670 L 984 647 Q 984 618 973 594 L 945 548 Q 931 517 932 485 L 908 447 Z" />
            <path d="M 986 414 Q 1012 416 1037 442 L 1044 497 Q 1042 529 1057 563 L 1062 618 Q 1055 648 1070 672 L 1053 692 L 1015 690 L 1024 663 Q 1026 636 1016 611 L 995 562 Q 981 529 984 494 L 963 450 Z" />
          </g>
          <path className="cow-body" d="M 213 171 C 236 139 287 127 343 139 C 397 140 441 150 489 158 C 547 169 600 177 651 176 C 704 176 753 169 802 157 C 856 143 905 125 954 108 C 1009 90 1060 100 1099 126 C 1137 151 1155 189 1159 235 C 1165 291 1152 350 1127 397 C 1106 436 1070 458 1027 466 C 975 476 922 459 869 449 C 802 437 744 452 680 459 C 610 466 553 458 495 465 C 447 466 411 449 376 432 C 341 417 311 400 286 365 C 258 330 229 294 216 250 C 205 218 201 190 213 171 Z" />
          <g clipPath="url(#cow-body-clip)">
            {shapes.filter(({ leg, head }) => !leg && !head).map(renderRegion)}
          </g>
          <g clipPath="url(#cow-front-leg-clip)">
            {shapes.filter(({ slug }) => slug === "osobuco").map(renderRegion)}
            {shapes.filter(({ slug }) => slug === "garron").map(renderRegion)}
            {shapes.filter(({ slug }) => slug === "brazuelo").map(renderRegion)}
          </g>
          <g clipPath="url(#cow-hind-leg-clip)">{shapes.filter(({ leg }) => leg === "trasera").map(renderRegion)}</g>
          <g className="cow-head">
            <path d="M 229 184 Q 202 156 171 159 Q 148 161 125 184 L 91 216 Q 75 237 62 264 Q 44 284 35 303 Q 33 322 49 333 Q 78 347 112 337 L 157 327 Q 183 319 211 294 L 247 265 Q 258 237 249 212 Z" />
            <path className="cow-head-detail" d="M 169 162 Q 135 140 111 115 Q 96 100 91 108 Q 86 117 100 141 Q 113 158 137 178 M 181 164 Q 172 139 159 121 Q 148 105 152 99 Q 156 93 170 106 Q 190 124 212 132 Q 229 139 224 154 Q 219 171 196 177 M 228 203 Q 252 181 276 178 Q 291 177 297 188 Q 299 197 290 208 L 263 237 Q 246 252 225 246 M 123 231 Q 136 218 149 223 Q 158 227 153 237 Q 144 248 127 242 M 54 303 Q 70 295 78 302 Q 81 308 73 314" />
            <path className="cow-eye" d="M 142 207 Q 153 197 166 203 Q 158 215 145 215 Z" />
            <circle className="cow-eye-glint" cx="154" cy="207" r="2.5" />
            <path className="cow-head-detail" d="M 204 280 Q 213 303 226 320 Q 236 335 260 344 M 112 336 Q 147 349 176 337 Q 192 331 207 318 M 87 268 Q 101 250 108 231" />
            <ellipse className="cow-nostril" cx="57" cy="309" rx="4" ry="3" transform="rotate(-19 57 309)" />
          </g>
          {shapes.filter(({ slug }) => slug === "lengua").map(renderRegion)}
          {shapes.filter(({ slug }) => slug === "cola").map(renderRegion)}
          <g className="map-region-labels">{shapes.map(renderLabel)}</g>
          <text className="map-caption" x="37" y="710">{translate(locale, "sideViewCaption")}</text>
          {activeShape && activeCorte && (
            <g className="map-tooltip" pointerEvents="none">
              <rect x={activeShape.x - Math.max(42, activeCorte.nombre.length * 4.5)} y={activeShape.y - 37} width={Math.max(84, activeCorte.nombre.length * 9)} height="25" rx="12.5" />
              <text x={activeShape.x} y={activeShape.y - 20}>{activeCorte.nombre}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="map-legend" aria-label="Referencias por zona">
        {zoneLabels.map(({ key, message }) => (
          <span className={`legend-item zone-${key}`} key={key}><span className="legend-dot" aria-hidden="true" />{translate(locale, message)}</span>
        ))}
      </div>
      <p className="map-hint">{translate(locale, "chooseCut")}</p>
    </div>
  );
}
