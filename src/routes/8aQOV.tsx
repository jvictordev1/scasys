import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { ItemsContext } from "@/context/ItemsContext";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, Item } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	PlusIcon,
	TriangleDownIcon,
	TriangleUpIcon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { ItemProp } from "@/interfaces/interface";

function EightaETP() {
	const [isOpen, setIsOpen] = useState(false);
	const [quantityOrValue, setQuantityOrValue] = useState(1);
	const [selectedValue, setSelectedItem] = useState<string>("selecione aqui");

	const contexto = useContext(ItemsContext);
	if (!contexto) {
		//const { items, setItemEspecificidade, setItemNome } =
		//	useContext(ItemsContext);

		return <div>a</div>;
	}

	const items = contexto.items;
	const adicionarItem = contexto.adicionarItem;

	function setItem(e: Event) {
		const target = e.target as HTMLDivElement;
		setSelectedItem(target.textContent ?? "unknown");
	}

	return (
		<div className="flex max-w-fit m-auto gap-x-24 justify-between mt-8">
			<div className="flex flex-col    gap-4 w-full max-w-[425px]">
				<h1 className="text-2xl font-bold w-full"> Fase de Inventario</h1>
				<div className="flex flex-col gap-4 mt-4 mb-4 ">
					{Array.from({ length: quantityOrValue }, (_, index) => (
						<div className="flex flex-col gap-3" key={index + quantityOrValue}>
							<Label htmlFor="quantitade" className="pl-2">
								Quantidade ou valor:
							</Label>
							<div className="inline-flex gap-2">
								<Input
									id="quantitade"
									placeholder="quantitade"
									className="w-32"
									type="number"
								/>
								<DropdownMenu>
									<DropdownMenuTrigger
										asChild
										className="flex flex-row min-w-32 justify-between border rounded-md gap-1 pr-2 pl-2"
									>
										<Button
											variant="outline"
											onClick={() => setIsOpen(!isOpen)}
										>
											{selectedValue}
											{isOpen ? (
												<TriangleDownIcon className="size-6" />
											) : (
												<TriangleUpIcon className="size-6" />
											)}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-32">
										<DropdownMenuGroup>
											<DropdownMenuItem onSelect={setItem}>
												Kilograma (Kg)
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem onSelect={setItem}>
												grama (g)
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem onSelect={setItem}>
												Litro (L)
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem onSelect={setItem}>
												Mol (mol)
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					))}
					<div className="inline-flex content-center items-center justify-start gap-6">
						<span>Adicionar nova quantidade e(ou) valor</span>
						<Button
							className="bg-green-400 rounded-full p-3"
							onClick={() => setQuantityOrValue(quantityOrValue + 1)}
						>
							<PlusIcon className="p-0" />
						</Button>
					</div>
					<div className="flex flex-col gap-3">
						<Label htmlFor="Item" className="pl-2">
							Observações :
						</Label>
						<Textarea />
					</div>
					<div className="inline-flex gap-3 w-fit items-center">
						<Label htmlFor="" className="pl-2">
							Adicionar novo item ao inventario?
						</Label>
						<Link to={"/inventario=1"}>
							<Button
								onClick={() => {
									adicionarItem();
								}}
							>
								Sim
							</Button>
						</Link>
						<Link to={"/inventario=1"}>
							<Button>Não</Button>
						</Link>
					</div>
				</div>
			</div>

			<div>
				<Table className="w-fit border">
					<TableCaption>A list of your recent invoices.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Fase</TableHead>
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

export { EightaETP };