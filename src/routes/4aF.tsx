import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { ItemsContext } from "@/context/ItemsContext";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
	PlusIcon,
	TriangleDownIcon,
	TriangleUpIcon,
} from "@radix-ui/react-icons";
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function FouraF() {
	const [selectedValue, setSelectedItem] = useState<string>("selecione aqui");

	const contexto = useContext(ItemsContext);
	if (!contexto) {
		//const { items, setItemEspecificidade, setItemNome } =
		//	useContext(ItemsContext);

		return <div>a</div>;
	}

	const items = contexto.items;
	const setItemFase = contexto.setItemFase;

	function setItem(e: Event) {
		const target = e.target as HTMLDivElement;
		setSelectedItem(target.textContent ?? "unknown");
	}

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex max-w-2xl m-auto gap-x-24 justify-between mt-8">
			<div className="flex flex-col w-full gap-8">
				<h1 className="text-2xl font-bold w-full"> Fase de Inventario</h1>
				<DropdownMenu>
					<DropdownMenuTrigger
						asChild
						className="flex flex-row min-w-32 justify-between border rounded-md gap-1 pr-2 pl-2"
					>
						<Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
							{selectedValue}
							{isOpen ? (
								<TriangleDownIcon className="size-6" />
							) : (
								<TriangleUpIcon className="size-6" />
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-48">
						<DropdownMenuLabel>Fases da etapa</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem onSelect={setItem}>Inicial</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onSelect={setItem}>Final</DropdownMenuItem>
							<DropdownMenuSeparator />
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="inline-flex content-center items-center justify-start gap-6">
					<span>Adicionar fase intermediaria ?</span>
					<Button className="bg-green-400 rounded-full p-3">
						<PlusIcon className="p-0" />
					</Button>
				</div>
				<div>
					<Link to={"/inventario=2"}>
						<Button onClick={() => setItemFase(selectedValue)}>Proxima</Button>
					</Link>
				</div>
			</div>
			<div>
				<Table className="w-fit border">
					<TableCaption>A list of your recent invoices.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Fase</TableHead>
							<TableHead>Etapa procedimental</TableHead>
							<TableHead>Especificidade</TableHead>
							<TableHead>Item</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((e) => {
							return (
								<TableRow key={e.Item}>
									<TableCell className="font-medium">{e.fase}</TableCell>
									<TableCell className="font-medium">{e.etapa}</TableCell>
									<TableCell className="font-medium">
										{e.especificidade}
									</TableCell>
									<TableCell className="font-medium text-right">
										{e.Item}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export { FouraF };