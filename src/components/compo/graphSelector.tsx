import { Button } from "@/components/ui/button"
import { BarChartIcon, PieChartIcon, LineChartIcon, AreaChartIcon  } from 'lucide-react'

export default function GraphSelector({ graphType, setGraphType }: { graphType: string, setGraphType: (type: string) => void  }) {
    return (
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          variant={graphType === "bar" ?  "outline" : "default" }
          size="sm"
          onClick={() => setGraphType("bar")}
        >
          <BarChartIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={graphType === "pie" ?  "outline" : "default" }
          size="sm"
          onClick={() => setGraphType("pie")}
        >
          <PieChartIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={graphType === "line" ?  "outline" : "default" }
          size="sm"
          onClick={() => setGraphType("line")}
        >
          <LineChartIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={graphType === "radar" ?  "outline" : "default" }
          size="sm"
          onClick={() => setGraphType("radar")}
        >
          <AreaChartIcon className="h-4 w-4" />
        </Button>
      </div>
    )
  }