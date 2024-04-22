import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function OrganizationalChart() {
    const [selection, setSelection] = useState([]);
    const [data] = useState([
        {
            label: 'Argentina',
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'Croatia'
                        }
                    ]
                },
                {
                    label: 'France',
                    expanded: true,
                    children: [
                        {
                            label: 'France'
                        },
                        {
                            label: 'Morocco'
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart
                value={data}
                selectionMode="single"
                selection={selection}
                onSelectionChange={(e) => setSelection(e.data)}
                pt={{
                    node: ({ context }) => ({
                        className: context.selected ? 'border-orange-400 border-round-sm' : 'border-primary-400 border-round-sm'
                    })
                }}
            />
        </div>
    )
}