import { useState } from "react";
import { Card as CardType, ColumnName, ROADMAP } from "@/data/roadmap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function Kanban() {
  const [board, setBoard] = useState(ROADMAP);

  const moveCard = (cardId: string, fromColumn: ColumnName, toColumn: ColumnName) => {
    setBoard((prev) => {
      const newColumns = prev.columns.map((col) => ({ ...col, items: [...col.items] }));
      const sourceCol = newColumns.find((c) => c.name === fromColumn);
      const targetCol = newColumns.find((c) => c.name === toColumn);

      if (!sourceCol || !targetCol) return prev;

      const cardIndex = sourceCol.items.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return prev;

      const [card] = sourceCol.items.splice(cardIndex, 1);
      targetCol.items.push(card);

      return { columns: newColumns };
    });
  };

  const getNextColumn = (current: ColumnName): ColumnName | null => {
    const order: ColumnName[] = ["Backlog", "Now", "Next", "Done"];
    const currentIndex = order.indexOf(current);
    return currentIndex < order.length - 1 ? order[currentIndex + 1] : null;
  };

  const getPrevColumn = (current: ColumnName): ColumnName | null => {
    const order: ColumnName[] = ["Backlog", "Now", "Next", "Done"];
    const currentIndex = order.indexOf(current);
    return currentIndex > 0 ? order[currentIndex - 1] : null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="group" aria-label="Kanban board">
      {board.columns.map((column) => (
        <section key={column.name} aria-labelledby={`column-${column.name}`} className="flex flex-col">
          <div className="mb-4 pb-2 border-b">
            <h2 id={`column-${column.name}`} className="text-lg font-semibold">
              {column.name}
              <Badge variant="secondary" className="ml-2">
                {column.items.length}
              </Badge>
            </h2>
          </div>
          <div className="space-y-3 flex-1">
            {column.items.map((card) => (
              <KanbanCard
                key={card.id}
                card={card}
                columnName={column.name}
                onMove={moveCard}
                nextColumn={getNextColumn(column.name)}
                prevColumn={getPrevColumn(column.name)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

interface KanbanCardProps {
  card: CardType;
  columnName: ColumnName;
  nextColumn: ColumnName | null;
  prevColumn: ColumnName | null;
  onMove: (cardId: string, from: ColumnName, to: ColumnName) => void;
}

function KanbanCard({ card, columnName, nextColumn, prevColumn, onMove }: KanbanCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="transition-colors">
      <CardHeader className="pb-3">
          <CardTitle className="text-base leading-tight">{card.title}</CardTitle>
          <CardDescription className="text-xs">
            Fällig: {new Date(card.due).toLocaleDateString("de-DE")} · {card.owner}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Ziel:</p>
            <p className="text-sm text-muted-foreground">{card.goal}</p>
          </div>

          {expanded && (
            <div className="space-y-3 motion-safe:animate-fade-in">
              <div>
                <p className="text-sm font-medium mb-1">Schritte:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {card.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Kriterien:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {card.criteria.map((criterion, idx) => (
                    <li key={idx}>{criterion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full h-auto min-h-[44px] text-xs"
            aria-expanded={expanded}
          >
            {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
          </Button>

          <div className="flex gap-2 pt-2">
            {prevColumn && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMove(card.id, columnName, prevColumn)}
                className="flex-1 h-auto min-h-[44px]"
                aria-label={`Nach ${prevColumn} verschieben`}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {prevColumn}
              </Button>
            )}
            {nextColumn && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMove(card.id, columnName, nextColumn)}
                className="flex-1 h-auto min-h-[44px]"
                aria-label={`Nach ${nextColumn} verschieben`}
              >
                {nextColumn}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
  );
}
